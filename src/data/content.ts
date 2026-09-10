/** All real content sourced from sattvalife.yoga */

export const BRAND = {
  name: 'Sattvalife Yoga',
  tagline: 'Stop Worrying, Start Living',
  location: 'Leicester, UK',
  copyright: '© Copyright Sattvalife Yoga 2024',
}

export const WELCOME = {
  title: 'Welcome to Sattvalife Yoga!',
  body: 'Sattvalife offers personalised yoga classes in Leicester, suitable for small groups and individuals. We also work with companies and corporate to integrate wellness practices into the workplace. We believe yoga has the power to improve anyone’s quality of life, regardless of age or physical ability. We endeavour to learn more about our students and offer them a personalised yoga class that fits their schedule, needs and abilities. Our core objective is to spread awareness among everyone and share its boundless boon.',
}

export const VINYASA = {
  title: 'About Vinyasa Yoga',
  body: "Vinyasa, also called flow because of the smooth way that the poses run together, is one of the most popular contemporary styles of yoga. It's a broad classification that encompasses many different types of yoga, including Ashtanga and power yoga. Yoga is a great activity for you if you have diabetes, high blood pressure, high cholesterol, or heart disease. It gives you strength, flexibility, and mind-body awareness.",
  pillars: [
    {
      title: 'Mindfulness',
      text: 'Experience mind-body awareness, the quality of being in the now, a sense of freedom, of perspective, of being connected',
    },
    {
      title: 'Discover yourself',
      text: 'Connect to your inner Self through Vinyasa (flow) and identify the part of you that is stronger than the outside world.',
    },
    {
      title: 'Meditation',
      text: 'Experience mind-body awareness, the quality of being in the now, a sense of freedom, of perspective, of being connected',
    },
  ],
}

export const JOURNEY = {
  quote: 'Yoga reminds me that everything is connected so we must live, act, and breathe with awareness.',
  title: 'Find What Feels Good',
  body: [
    'Workout fads come and go, but virtually no other exercise program is as enduring as yoga. It’s been around for more than 5,000 years.',
    'Yoga does more than burn calories and tone muscles. It’s a total mind-body workout that combines strengthening and stretching poses with deep breathing and meditation or relaxation.',
  ],
  stats: ['Breathing', 'Metabolism', 'Flexibility', 'Toned Muscles'],
}

export interface Course {
  id: 'dropIn' | 'monthly' | 'corporate'
  name: string
  price: number
  unit: string
  blurb: string
  features: string[]
  focus: string[]
  benefits: string[]
  popular?: boolean
  stripePriceId?: string
}

export const COURSES: Course[] = [
  {
    id: 'dropIn',
    name: 'Drop-In Class',
    price: 10,
    unit: 'per class',
    blurb: 'Join any group session at Thurnby Memorial Hall or Trinity Methodist Church, Oadby.',
    features: [
      'Any scheduled group class',
      'Small groups & individuals welcome',
      'All ages & physical abilities',
      'Mats & props provided',
    ],
    focus: ['Back', 'Belly', 'Breath'],
    benefits: ['Improved back strength', 'Toned belly & improved digestion', 'Deeper, relaxed, corrective breathing'],
  },
  {
    id: 'monthly',
    name: 'Monthly Flow',
    price: 35,
    unit: 'per month',
    blurb: 'Our most-loved plan — unlimited Vinyasa flow classes every week, personalised to you.',
    features: [
      'Unlimited weekly classes',
      'Personalised to schedule, needs & abilities',
      'Priority booking for both venues',
      'Wellness tips & habit-building support',
    ],
    focus: ['Back', 'Belly', 'Breath'],
    benefits: ['Improved back strength', 'Toned belly & improved digestion', 'Deeper, relaxed, corrective breathing'],
    popular: true,
  },
  {
    id: 'corporate',
    name: 'Sattvalife@Work',
    price: 250,
    unit: 'per session',
    blurb: 'Bring yoga to your workplace — wellness sessions your team will actually look forward to.',
    features: [
      'On-site / online team sessions',
      'Workshops & webinars with expert teachers',
      'Chair ergonomics & desk-stretch routines',
      'Well-tailored programmes for your team',
    ],
    focus: ['Team wellbeing', 'Posture', 'Stress relief'],
    benefits: ['Consistent, tangible results', 'Happier, more productive workforce', 'Long-term habit-building'],
  },
]

export const TIMETABLE = {
  title: 'Class Timetable',
  subtitle: 'Join our program',
  venues: [
    {
      day: 'Tuesday',
      hall: 'Trinity Methodist Church, Oadby',
      postcode: 'LE2 5AB',
      start: '6:00 PM',
      end: '7:30 PM',
    },
    {
      day: 'Thursday',
      hall: 'Thurnby Memorial Hall',
      postcode: 'LE7 9PN',
      start: '7:00 PM',
      end: '8:00 PM',
    },
  ],
}

export const INSTRUCTORS = [
  {
    name: 'Amisha Soni',
    role: 'Yoga & Fitness Instructor',
    image: '/images/amisha-hires.jpg',
    bio: 'As a teenager I was already pondering upon the meaning of life. My curiosity towards life and a constant push from my father led me to learn yoga for my personal development. Little did I know that I will take it up as a full time profession immediately after completing my degree. Yoga changed my life by helping me fall in love with my imperfect self, discover my inner strength and truly appreciate everything in and around me. With a strong desire to share this knowledge and to help people discover their inner strength, I created Sattvalife yoga where people can trek on a journey of self discovery like never before. Come and join me in this journey!',
  },
  {
    name: 'Nish Soni',
    role: 'Yoga Instructor',
    image: '/images/nish-hires.jpg',
    bio: 'I discovered my inner self through yoga amidst the hush life of a metro city. Yoga did not only help me overcome the everyday stress but also inspired me to continue spreading this great practice to help achieve solace with one’s own being. Yoga is a complete alignment of mind, body and soul through a series of physical postures, breathing techniques and meditation. Sattvalife inspires one for a lifestyle change leading into a positive and enlightened life ahead. “Surrender yourself completely and discover the complete you.”',
  },
]

export const CORPORATE = {
  title: 'Sattvalife @Work',
  tagline: 'Get traditional with yoga. It works at the workplace too.',
  body: 'At Sattvalife we take great pride in helping companies embrace a fitness culture amongst their employees with the help of regular yoga sessions within the company premises. Our yoga instructors are very popular with companies who want regular yoga sessions for their employees — we recently started conducting sessions for the employees of UK-based company NEXT in Leicester. Our sessions amp up with hybrid stretches and relaxation techniques that help desk-bound employees banish aches and pains, and understand chair ergonomics and fitness tips for daily office routines.',
  offersTitle: 'What we offer',
  offersIntro: 'Quality teaching and knowledge sharing of age-old, proven techniques for physical and mental wellbeing at work, through:',
  offers: [
    'Specialised online programs for employees',
    'Workshops and webinars with expert teachers from India',
    'Well-tailored programmes',
    'Regular & traditional yoga practice',
    'Attention to physical, mental & emotional well-being',
    'Focus on long term habit-building, not short-term promises',
    'Consistent, tangible results in workforce happiness and productivity',
  ],
  images: ['/images/corp-original-1.jpg', '/images/corp-original-2.jpg', '/images/corp1.jpg', '/images/corp2.jpg'],
}

/** Real Google reviews as published on sattvalife.yoga */
export interface Review {
  author: string
  rating: number
  text: string
  time: string
}

export const FALLBACK_REVIEWS: Review[] = [
  {
    author: 'Sally Cook',
    rating: 5,
    text: "Amisha does lovely seated yoga classes at our office for our team of very busy lawyers. It's a perfect lunchtime reset and I always feel more focussed and productive afterwards.",
    time: 'a month ago',
  },
  {
    author: 'Donna Morrell',
    rating: 5,
    text: 'I absolutely love these sessions, they are so much fun and the feeling of relaxation and wellbeing afterwards is amazing.',
    time: '2 months ago',
  },
  {
    author: 'Jiten Anand',
    rating: 5,
    text: 'The team at Sattvalife Yoga delivered a wellbeing morning for our staff. It was a very relaxed start to the day and highly recommend working with them as part of your business needs! Nice way to get the team together, collectively feel relaxed and explore yoga in an easy going and light hearted way.',
    time: '3 months ago',
  },
  { author: 'Al-Ameen Hassan', rating: 5, text: 'Lovely people to work with, 5 stars overall', time: '3 months ago' },
  {
    author: 'Harpreet Bhoot',
    rating: 5,
    text: "A really good teacher and yoga class. It's helped me to be more flexible, and strengthen. I love these classes",
    time: '4 months ago',
  },
  {
    author: 'Maryam Behyari',
    rating: 5,
    text: 'The sessions are really relaxing and nice, neither too hard nor too easy. I enjoy it',
    time: '5 months ago',
  },
  {
    author: 'Laura Camila Bermúdez Jaramillo',
    rating: 5,
    text: 'It was a great session. I love Pilates and the instructor is amazing! She combines Pilates and Yoga, which is great. Thank you.',
    time: '6 months ago',
  },
  { author: 'Kate Zotova', rating: 5, text: 'Useful and fun!', time: '7 months ago' },
  { author: 'Harnoor Diyal', rating: 5, text: 'Awesome', time: '8 months ago' },
]

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  tags: string[]
  content: string[]
}

export const FOCUS_AREAS = {
  title: '3 Key Focus Areas',
  areas: ['Back', 'Belly', 'Breathing'],
  benefits: ['Improved back strength', 'Toned belly & improved digestion', 'Deeper, relaxed, corrective breathing'],
}

export const REGISTRATION_FORM = {
  fields: [
    { label: 'Registering for', type: 'radio', options: ['Self', 'Someone else'] },
    { label: 'Have you practiced yoga before?', type: 'radio', options: ['Yes', 'No'] },
    { label: 'If yes specify when and how long for?', type: 'text' },
    { label: 'Any past surgeries or illness not mentioned?', type: 'text' },
    { label: 'Additional notes / information', type: 'textarea' },
  ],
  painAreas: ['Neck', 'Shoulders', 'Elbows', 'Hands', 'Wrists', 'Hips', 'Lower Back', 'Upper Back', 'Knees', 'Feet', 'Other'],
  waiver: [
    "If at any time during the class, you feel discomfort or strain, gently come out of the posture. You may rest at anytime during the class. It is important in yoga that you listen to your body, and respect its limits on any given day.",
    "I understand that yoga is not a substitute for medical attention, examination, diagnosis, or treatment. I should consult a physician prior to beginning any activity program, including yoga. I recognise that it is my responsibility to notify my teacher of any serious illness or injury before yoga class. I will not perform any postures to the extent of the strain or pain.",
    "I accept that neither the instructor, nor the hosting facility, is liable for any injury, or any damages, to person or property, resulting from the taking of the class. Those under 18 years of age must have this form signed by a parent or guardian.",
    "I give consent for any pictures or videos taken during the class to be used for Sattva Yoga promotion.",
  ],
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '3-quick-yoga-asanas-for-back-pain',
    title: '3 Quick Yoga Asanas to Get Relief from Back Pain',
    excerpt: 'Sitting is the new smoking. Learn three powerful yoga poses to counter the effects of prolonged desk work.',
    date: '2022-06-30',
    author: 'Amisha Soni',
    image: '/images/pose.jpg',
    tags: ['Back Pain', 'Asanas', 'Wellness'],
    content: [
      '"Sitting is the new smoking" — a phrase that captures the hidden cost of our desk-bound lives. Prolonged sitting affects more than your eyesight; it impacts posture, metabolism, and mental health, increasing risks of anxiety, depression, and obesity.',
      'Poor posture is directly linked to back pain, cardiovascular problems, digestive issues, and gradual spinal changes that only worsen over time. Yoga offers a natural, effective countermeasure.',
      'Here are three powerful asanas to incorporate into your daily routine:',
      '1. Adho Mukha Svanasana (Downward-Facing Dog) — This inversion stretches the spine, hamstrings, and calves while strengthening the shoulders and arms. It relieves back tension by lengthening the entire posterior chain.',
      '2. Marjaryasana (Cat/Cow Pose) — A gentle flow between arching and rounding the spine that mobilises the vertebrae, releases tension in the back and neck, and massages the digestive organs.',
      '3. Trikonasana (Triangle Pose) — This standing pose opens the hips, stretches the hamstrings, and strengthens the legs while lengthening the side body and improving spinal alignment.',
      'By strengthening and stretching the shoulders, chest, back, and abdominals — areas most impacted by prolonged sitting — these poses help you stand taller, live with an open heart, and find relief from the discomfort of poor posture.',
    ],
  },
  {
    slug: 'yoga-and-meditation',
    title: 'Yoga and Meditation',
    excerpt: 'Discover how meditation complements your yoga practice and why it matters for mental clarity and wellbeing.',
    date: '2024-03-27',
    author: 'Amisha Soni',
    image: '/images/about-hero.jpg',
    tags: ['Meditation', 'Mindfulness', 'Wellness'],
    content: [
      'Yoga and meditation have become increasingly popular in the Western world, with practitioners praising their psychological and physical benefits. Current research suggests these ancient practices can boost overall well-being and resilience to stress factors.',
      'Meditation is one of the main principles of yoga — a reliable method for achieving mental clarity and health. There are various meditation exercises designed for both advanced and beginner yoga students. It is essential to carefully analyse each technique to maximise results.',
      'Contrary to popular belief, meditation is not something that "comes naturally and cannot be taught." Timing matters — meditate either in the morning or late in the evening, when the atmosphere is charged with a high level of spiritual energy.',
      'Six tips for effective meditation: (1) Free your mind of all worries before starting. (2) Find a quiet place where you are not likely to be disturbed. (3) Choose the same time and same place for your routine. (4) Focus on meditation; do not let your mind wander. (5) Follow a pattern when breathing. (6) Keep your head, back, and neck in a perfect straight line.',
      'The essential practice is both to perform meditation sessions and to observe the results — this is how we approach the supreme synchronisation between body and spirit.',
    ],
  },
  {
    slug: 'empowering-children-through-yoga',
    title: 'Conclusion: Empowering Children Through Yoga',
    excerpt: 'Children face immense stress too. Yoga gives them tools for self-health, relaxation, and inner fulfilment.',
    date: '2024-03-27',
    author: 'Amisha Soni',
    image: '/images/kids.jpeg',
    tags: ['Children', 'Family', 'Yoga Benefits'],
    content: [
      'Children today face significant stress from school pressures, incessant lessons, video games, competitive sports, and the digital world. Like adults, they can benefit immensely from yoga — learning techniques for self-health, relaxation, and inner fulfilment that help them navigate challenges with greater ease.',
      'Yoga at a young age encourages self-esteem and body awareness through a non-competitive physical activity. Here are seven key benefits:',
      '1. Anxiety relief — Yoga helps children manage anxious feelings through breathing and movement.',
      '2. Stress management — Breathing exercises and relaxation techniques taught in class help kids handle stress. Learning healthy stress reduction is a life skill that serves them as children and adults.',
      '3. Self-esteem boost — Mastering poses and improving balance gives children a genuine sense of empowerment.',
      '4. Body awareness and mindfulness — Various poses teach children about their bodies and what movements they can perform.',
      '5. Concentration and memory — Different moves require focus and memorisation, which translates into academic performance.',
      '6. Strength, coordination, and flexibility — Yoga strengthens growing bodies and reduces injury risk.',
      '7. Discipline and reduced impulsivity — Yoga provides a physical outlet for self-expression and teaches discipline through clearing the mind and perfecting poses.',
      'Children are natural yogis. Their innate trust and lack of inhibitions allow them to receive the teachings of yoga and grow from them in truly inspiring ways.',
    ],
  },
]
