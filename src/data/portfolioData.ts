export interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
  downloadUrl?: string;
  verifyUrl?: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'hackathon' | 'internship' | 'award' | 'milestone';
  organization?: string;
}

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Aptimind Winner',
    organization: 'Veltech University, Chennai',
    date: 'January 2025',
    category: 'contests',
    description: 'Cracked complex logic puzzles and outperformed 300+ peers in a battle of brains to claim the Aptimind crown.',
    imageUrl: 'certificates/aptimind.jpg',
    downloadUrl: '/certificates/aptimind.jpg',
    verifyUrl: '#',
    skills: ['Aptitude', 'Logic', 'Problem Solving']
  },
  {
    id: '2',
    title: 'Code Debugging Champion',
    organization: 'Annual Tech Fest - Veltech University',
    date: '30 March 2024',
    category: 'contests',
    description: 'Sliced through spaghetti code and squashed 25+ bugs in record time — crowned the ultimate debugger of the fest.',
    imageUrl: 'certificates/code_debugging.jpg',
    downloadUrl: '/certificates/code_debugging.jpg',
    verifyUrl: '#',
    skills: ['Debugging', 'JavaScript', 'C++', 'Analytical Thinking']
  },
  {
    id: '3',
    title: 'Web Development Certification',
    organization: 'Iliziam - Veltech University',
    date: '24 - 25 February 2025',
    category: 'contests',
    description: 'Mastered the modern web — built stunning UIs and powerful APIs from scratch like a true full-stack ninja.',
    imageUrl: 'certificates/iliziam_webdev.jpg',
    downloadUrl: '/certificates/iliziam_webdev.jpg',
    verifyUrl: '#',
    skills: ['HTML', 'CSS', 'React', 'MongoDB', 'Node.js']
  },
  {
    id: '4',
    title: 'IEEE Quiz Finalist',
    organization: 'IEEE ',
    date: '15 April 2025',
    category: 'contests',
    description: 'Blazed through tech trivia and brain-teasers to secure a top spot among the brightest engineering minds.',
    imageUrl: 'certificates/ieee_quiz.jpg',
    downloadUrl: '/certificates/ieee_quiz.jpg',
    verifyUrl: '#',
    skills: ['Cloud', 'Networking', 'Cybersecurity', 'AI']
  },
  {
    id: '5',
    title: 'Techxcelerate 2025 - Best Blockchain Implementation',
    organization: 'BITS Goa',
    date: 'February 2025',
    category: 'hackathons',
    description: 'Built a cutting-edge blockchain solution that turned heads, dropped jaws, and made it to finals of India’s elite hackathon.',
    imageUrl: 'certificates/techxcelerate_hackathon.jpg',
    downloadUrl: '/certificates/techxcelerate_hackathon.jpg',
    verifyUrl: '#',
    skills: ['Blockchain', 'Solidity', 'React', 'IPFS', 'Smart Contracts']
  },
  {
    id: '6',
    title: 'MERN Stack Bootcamp Certificate',
    organization: 'BITS Pilani Goa',
    date: 'February 2025',
    category: 'workshops',
    description: 'Intense coding drills and emerged a MERN maestro ready to ship production-grade apps.',
    imageUrl: 'certificates/mern_stack.jpg',
    downloadUrl: '/certificates/mern_stack.jpg',
    verifyUrl: '#',
    skills: ['MongoDB', 'Express', 'React', 'Node.js']
  },
  {
    id: '7',
    title: 'Blockchain Based Certification System - Startup Pitching',
    organization: 'Veltech Innovation Council',
    date: '22 February 2025',
    category: 'projects',
    description: 'Dove deep into the future of Web3, building dApps and deploying smart contracts like a crypto-native.',
    imageUrl: 'certificates/blockchain_certification.jpg',
    downloadUrl: '/certificates/blockchain_certification.jpg',
    verifyUrl: '#',
    skills: ['Blockchain', 'Ethereum', 'Web3.js']
  },
  {
    id: '8',
    title: 'Project Idea Contest Finalist',
    organization: 'Veltech Innovation Council',
    date: '3 September 2024',
    category: 'contests',
    description: 'Pitched a next-gen tech solution that wowed the panel and broke into the finals of a campus-wide innovation war.',
    imageUrl: 'certificates/project_idea_contest.jpg',
    downloadUrl: '/certificates/project_idea_contest.jpg',
    verifyUrl: '#',
    skills: ['Pitching', 'Product Thinking', 'UI/UX']
  },
  {
    id: '9',
    title: 'Cybersecurity Essentials',
    organization: 'Department of Management Studies, Veltech University',
    date: '15 September 2023',
    category: 'workshops',
    description: 'Trained to think like a hacker and defend like a fortress — mastered the art of digital protection.',
    imageUrl: 'certificates/cybersecuriy.jpg',
    downloadUrl: '/certificates/cybersecuriy.jpg',
    verifyUrl: '#',
    skills: ['Cybersecurity', 'Encryption', 'Firewalls', 'Ethical Hacking']
  },
  {
    id: '10',
    title: 'NoSQL Databases Workshop',
    organization: 'Department of Computer Science, Veltech University',
    date: '14 August 2024',
    category: 'workshops',
    description: 'Unleashed the power of unstructured data and learned to bend NoSQL to build lightning-fast backends.',
    imageUrl: 'certificates/noSQL_workshop.jpg',
    downloadUrl: '/certificates/noSQL_workshop.jpg',
    verifyUrl: '#',
    skills: ['MongoDB', 'NoSQL', 'Indexing', 'Query Optimization']
  },
  {
    id: '11',
    title: 'Smart Shopping Trolley - Project Showcase',
    organization: 'Smart India Hackathon',
    date: '30 March 2024',
    category: 'projects',
    description: 'Reimagined retail with an AI-powered trolley that predicts what shoppers need — before they do.',
    imageUrl: 'certificates/smart_shopping_trolley.jpg',
    downloadUrl: '/certificates/smart_shopping_trolley.jpg',
    verifyUrl: '#',
    skills: ['ML', 'IoT', 'Python', 'React']
  },
  {
    id: '12',
    title: 'Machine Learning Foundation',
    organization: 'Department of Computer Science, Veltech University',
    date: 'August 2024',
    category: 'workshops',
    description: 'Demystified data, trained smart models, and unlocked the gateway to intelligent machines.',
    imageUrl: 'certificates/machine_learning.jpg',
    downloadUrl: '/certificates/machine_learning.jpg',
    verifyUrl: '#',
    skills: ['ML', 'Python', 'SciKit Learn', 'Data Preprocessing']
  },
  {
    id: '13',
    title: 'Technical Quiz Competition',
    organization: 'Velammal Engineering College Chennai',
    date: 'March 2024',
    category: 'contests',
    description: 'Faced off against top tech minds in a high-stakes quiz that tested speed, logic, and precision. Walked away sharper and more prepared for the next challenge.',
    imageUrl: 'certificates/tech_quiz.jpg',
    downloadUrl: '/certificates/tech_quiz.jpg',
    verifyUrl: '#',
    skills: ['CSE Concepts', 'Quick Thinking', 'Fundamentals']
  }
];


export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Smart India Hackathon Winner',
    description: 'Won first place among 5000+ teams with an AI-powered traffic management solution',
    date: 'March 2024',
    type: 'hackathon',
    organization: 'Government of India'
  },
  {
    id: '2',
    title: 'Microsoft Internship',
    description: 'Completed summer internship at Microsoft India, working on Azure DevOps improvements',
    date: 'August 2023',
    type: 'internship',
    organization: 'Microsoft India'
  },
  {
    id: '3',
    title: 'Dean\'s List Achievement',
    description: 'Achieved Dean\'s List for maintaining 9.2+ CGPA for consecutive semesters',
    date: 'May 2023',
    type: 'award',
    organization: 'University'
  },
  {
    id: '4',
    title: 'HackMIT Best AI Implementation',
    description: 'Won Best AI Implementation award for creating an intelligent study companion',
    date: 'September 2023',
    type: 'hackathon',
    organization: 'MIT'
  },
  {
    id: '5',
    title: 'Open Source Contributor Milestone',
    description: 'Reached 100+ contributions to open source projects on GitHub',
    date: 'July 2023',
    type: 'milestone'
  },
  {
    id: '6',
    title: 'Tech Lead - College Startup',
    description: 'Led development team for college startup that reached 1000+ active users',
    date: 'January 2023',
    type: 'milestone',
    organization: 'CollegeConnect'
  }
];