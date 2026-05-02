export const coursesData = {
  modules: [
    {
      id: 1,
      title: "O'zbekiston Konstitutsiyasi",
      icon: 'menu_book',
      colorClass: 'bg-primary-container',
      textClass: 'text-primary-container',
      totalLessons: 24,
      completedPercentage: 65,
      progressClass: 'bg-primary'
    },
    {
      id: 2,
      title: "Tarix",
      icon: 'history_edu',
      colorClass: 'bg-secondary-container',
      textClass: 'text-secondary',
      totalLessons: 32,
      completedPercentage: 12,
      progressClass: 'bg-secondary'
    },
    {
      id: 3,
      title: "Huquq asoslari",
      icon: 'balance',
      colorClass: 'bg-primary-container',
      textClass: 'text-primary-container',
      totalLessons: 18,
      completedPercentage: 0,
      progressClass: 'bg-primary'
    }
  ],
  videos: [
    {
      id: 1,
      title: "1-dars. Konstitutsiyaning yaratilish tarixi va ahamiyati",
      subject: "Konstitutsiya",
      duration: "15:24",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
      featured: true
    },
    {
      id: 2,
      title: "Inson huquqlari va erkinliklari",
      subject: "Huquq asoslari",
      duration: "12:45",
      image: "https://images.unsplash.com/photo-1505664173615-04f1e9443c72?auto=format&fit=crop&q=80&w=300",
      featured: false
    },
    {
      id: 3,
      title: "O'zbekiston davlatchilik tarixi",
      subject: "Tarix",
      duration: "21:10",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=300",
      featured: false
    }
  ],
  guides: [
    {
      id: 1,
      title: "Mantiqiy savollar",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      id: 2,
      title: "Konstitutsiya-2023",
      size: "1.8 MB",
      format: "PDF"
    },
    {
      id: 3,
      title: "Testlar to'plami",
      size: "5.2 MB",
      format: "PDF"
    }
  ]
}
