import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as base64 from "https://deno.land/std@0.168.0/encoding/base64.ts"

// Payme kalitlari va narx (450 000 so'm = 45000000 tiyin)
const PAYME_KEY = Deno.env.get('PAYME_MERCHANT_KEY') || 'test-key-123'
const COURSE_PRICE_TIYIN = 45000000

// Supabase klient
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// Payme xatolar kodlari
const ERROR_CODES = {
  INVALID_AMOUNT: -31001,
  ACCOUNT_NOT_FOUND: -31050,
  TRANSACTION_NOT_FOUND: -31003,
  UNABLE_TO_COMPLETE: -31008,
  AUTH_ERROR: -32504,
}

serve(async (req) => {
  // Payme faqat POST orqali murojaat qiladi
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  // 1. Avtorizatsiyani tekshirish (Basic Auth)
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response(JSON.stringify({
      error: { code: ERROR_CODES.AUTH_ERROR, message: { uz: "Avtorizatsiya xatosi" } }
    }), { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  const decoded = new TextDecoder().decode(base64.decode(token))
  const [login, password] = decoded.split(':')

  if (password !== PAYME_KEY) {
    return new Response(JSON.stringify({
      error: { code: ERROR_CODES.AUTH_ERROR, message: { uz: "Noto'g'ri kalit" } }
    }), { status: 401 })
  }

  // 2. So'rovni o'qish
  const body = await req.json()
  const { method, params, id } = body

  try {
    // ---------------------------------------------------------
    // CheckPerformTransaction (To'lov qilsa bo'ladimi?)
    // ---------------------------------------------------------
    if (method === 'CheckPerformTransaction') {
      const { amount, account } = params
      const userId = account.user_id

      // 1. Foydalanuvchini tekshirish
      const { data: user } = await supabaseAdmin.from('users').select('id').eq('id', userId).single()
      if (!user) {
        return Response.json({
          id, error: { code: ERROR_CODES.ACCOUNT_NOT_FOUND, message: { uz: "Foydalanuvchi topilmadi" } }
        })
      }

      // 2. Summani tekshirish
      if (amount !== COURSE_PRICE_TIYIN) {
        return Response.json({
          id, error: { code: ERROR_CODES.INVALID_AMOUNT, message: { uz: "Summa noto'g'ri" } }
        })
      }

      return Response.json({
        id, result: { allow: true }
      })
    }

    // ---------------------------------------------------------
    // CreateTransaction (Tranzaksiya yaratish)
    // ---------------------------------------------------------
    else if (method === 'CreateTransaction') {
      const { id: transId, time, amount, account } = params
      const userId = account.user_id

      // Tranzaksiya bormi tekshiramiz
      const { data: existTrans } = await supabaseAdmin.from('payments').select('*').eq('transaction_id', transId).single()
      
      if (existTrans) {
        if (existTrans.status !== 'pending') {
          return Response.json({
            id, error: { code: ERROR_CODES.UNABLE_TO_COMPLETE, message: { uz: "Tranzaksiya allaqachon yakunlangan" } }
          })
        }
        return Response.json({
          id, result: { create_time: new Date(existTrans.created_at).getTime(), transaction: existTrans.id.toString(), state: 1 }
        })
      }

      // Yangi tranzaksiya yaratish
      const { data: newTrans, error } = await supabaseAdmin.from('payments').insert({
        user_id: userId,
        amount: amount / 100, // so'mda
        provider: 'payme',
        transaction_id: transId,
        status: 'pending'
      }).select().single()

      if (error) throw error

      return Response.json({
        id, result: { create_time: new Date(newTrans.created_at).getTime(), transaction: newTrans.id.toString(), state: 1 }
      })
    }

    // ---------------------------------------------------------
    // PerformTransaction (To'lovni tasdiqlash)
    // ---------------------------------------------------------
    else if (method === 'PerformTransaction') {
      const { id: transId } = params

      const { data: trans } = await supabaseAdmin.from('payments').select('*').eq('transaction_id', transId).single()
      if (!trans) {
        return Response.json({ id, error: { code: ERROR_CODES.TRANSACTION_NOT_FOUND, message: { uz: "Tranzaksiya topilmadi" } } })
      }

      if (trans.status === 'completed') {
        return Response.json({
          id, result: { transaction: trans.id.toString(), perform_time: new Date(trans.updated_at).getTime(), state: 2 }
        })
      }

      // To'lovni tasdiqlash va obunani qo'shish
      await supabaseAdmin.from('payments').update({ status: 'completed' }).eq('id', trans.id)
      
      // Oylik obunani qo'shish
      const startDate = new Date()
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1)
      
      await supabaseAdmin.from('user_subscriptions').insert({
        user_id: trans.user_id,
        course_id: 1, // Umumiy kurs IDsini dinamik qilish mumkin
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        is_active: true
      })

      return Response.json({
        id, result: { transaction: trans.id.toString(), perform_time: new Date().getTime(), state: 2 }
      })
    }

    // Boshqa Payme metodlari (CancelTransaction, CheckTransaction)
    return Response.json({ id, error: { code: -32601, message: "Method not found" } })

  } catch (err) {
    return Response.json({ id, error: { code: -32400, message: "Tizim xatosi" } })
  }
})
