-- ==============================================================================
-- PHASE 2: SEED DATA FOR SUPABASE
-- Merges new projects, skills, education, experience, achievements with all audited content
-- ==============================================================================

-- 1. Admin User
insert into public.admin_users (email, role)
values ('arshh12145@gmail.com', 'admin')
on conflict (email) do nothing;

-- 2. Site Settings
insert into public.site_settings (
  id, name, headline, tagline, bio, photo_url, location, email, phone,
  availability_text, show_availability, footer_text, meta_title, meta_description, og_image_url, status, sort_order
)
values (
  '00000000-0000-0000-0000-000000000001',
  'Md Arsh Eqbal',
  'Full Stack Web Developer & AI Enthusiast',
  'Building scalable AI-powered web applications and intelligent automation systems.',
  'Md Arsh Eqbal is a B.Tech Computer Science Engineering student and full-stack developer skilled in building real-world enterprise web systems, AI vision pipelines, and mobile safety platforms.',
  '/profile/arsh-profile.jpg',
  'Jamshedpur, India',
  'arshh12145@gmail.com',
  '+91 9608846764',
  'Open to internships and full-time roles',
  true,
  '© 2024 Md Arsh Eqbal. Built with Next.js and Tailwind CSS.',
  'Md Arsh Eqbal | Full Stack Developer & AI Enthusiast',
  'Md Arsh Eqbal - B.Tech CSE student & full-stack developer skilled in building AI-powered web applications and automation systems.',
  '/profile/arsh-profile.jpg',
  'published',
  0
)
on conflict (id) do nothing;

-- 3. Social Links
insert into public.social_links (id, platform, label, url, icon, visible, status, sort_order)
values
  ('00000000-0000-0000-0001-000000000001', 'GitHub', 'github.com/arsh090', 'https://github.com/arsh090', 'Github', true, 'published', 1),
  ('00000000-0000-0000-0001-000000000002', 'LinkedIn', 'linkedin.com/in/md-arsh-eqbal', 'https://linkedin.com/in/md-arsh-eqbal', 'Linkedin', true, 'published', 2),
  ('00000000-0000-0000-0001-000000000003', 'Instagram', '@look_itz_arshu', 'https://www.instagram.com/look_itz_arshu?igsh=Z3oxd205M2RtdDFw', 'Instagram', true, 'published', 3),
  ('00000000-0000-0000-0001-000000000004', 'WhatsApp', '+91 9608846764', 'https://wa.me/919608846764', 'MessageCircle', true, 'published', 4),
  ('00000000-0000-0000-0001-000000000005', 'Email', 'arshh12145@gmail.com', 'mailto:arshh12145@gmail.com', 'Mail', true, 'published', 5)
on conflict (id) do nothing;

-- 4. Skill Categories & Skills
insert into public.skill_categories (id, name, status, sort_order)
values
  ('00000000-0000-0000-0002-000000000001', 'Languages', 'published', 1),
  ('00000000-0000-0000-0002-000000000002', 'Frontend', 'published', 2),
  ('00000000-0000-0000-0002-000000000003', 'Backend', 'published', 3),
  ('00000000-0000-0000-0002-000000000004', 'Database', 'published', 4),
  ('00000000-0000-0000-0002-000000000005', 'Cloud and DevOps', 'published', 5),
  ('00000000-0000-0000-0002-000000000006', 'AI and Automation', 'published', 6)
on conflict (id) do nothing;

-- Skills
insert into public.skills (category_id, name, level, status, sort_order)
values
  -- Languages
  ('00000000-0000-0000-0002-000000000001', 'JavaScript', 'Advanced', 'published', 1),
  ('00000000-0000-0000-0002-000000000001', 'TypeScript', 'Advanced', 'published', 2),
  ('00000000-0000-0000-0002-000000000001', 'Python', 'Advanced', 'published', 3),
  ('00000000-0000-0000-0002-000000000001', 'PHP', 'Intermediate', 'published', 4),
  ('00000000-0000-0000-0002-000000000001', 'SQL', 'Advanced', 'published', 5),
  ('00000000-0000-0000-0002-000000000001', 'Dart', 'Intermediate', 'published', 6),

  -- Frontend
  ('00000000-0000-0000-0002-000000000002', 'React.js', 'Advanced', 'published', 1),
  ('00000000-0000-0000-0002-000000000002', 'Next.js', 'Advanced', 'published', 2),
  ('00000000-0000-0000-0002-000000000002', 'Vite', 'Advanced', 'published', 3),
  ('00000000-0000-0000-0002-000000000002', 'Tailwind CSS', 'Advanced', 'published', 4),
  ('00000000-0000-0000-0002-000000000002', 'Framer Motion', 'Advanced', 'published', 5),
  ('00000000-0000-0000-0002-000000000002', 'HTML5', 'Advanced', 'published', 6),
  ('00000000-0000-0000-0002-000000000002', 'CSS3', 'Advanced', 'published', 7),
  ('00000000-0000-0000-0002-000000000002', 'Flutter', 'Intermediate', 'published', 8),
  ('00000000-0000-0000-0002-000000000002', 'React Native (Expo)', 'Intermediate', 'published', 9),

  -- Backend
  ('00000000-0000-0000-0002-000000000003', 'Node.js', 'Advanced', 'published', 1),
  ('00000000-0000-0000-0002-000000000003', 'Express.js', 'Advanced', 'published', 2),
  ('00000000-0000-0000-0002-000000000003', 'NestJS', 'Intermediate', 'published', 3),
  ('00000000-0000-0000-0002-000000000003', 'FastAPI', 'Advanced', 'published', 4),
  ('00000000-0000-0000-0002-000000000003', 'Flask', 'Intermediate', 'published', 5),
  ('00000000-0000-0000-0002-000000000003', 'REST APIs', 'Advanced', 'published', 6),
  ('00000000-0000-0000-0002-000000000003', 'JWT Authentication', 'Advanced', 'published', 7),

  -- Database
  ('00000000-0000-0000-0002-000000000004', 'MongoDB', 'Advanced', 'published', 1),
  ('00000000-0000-0000-0002-000000000004', 'MySQL', 'Advanced', 'published', 2),
  ('00000000-0000-0000-0002-000000000004', 'PostgreSQL', 'Advanced', 'published', 3),
  ('00000000-0000-0000-0002-000000000004', 'Firebase', 'Advanced', 'published', 4),
  ('00000000-0000-0000-0002-000000000004', 'Firestore', 'Advanced', 'published', 5),

  -- Cloud and DevOps
  ('00000000-0000-0000-0002-000000000005', 'AWS (Serverless)', 'Intermediate', 'published', 1),
  ('00000000-0000-0000-0002-000000000005', 'Docker', 'Intermediate', 'published', 2),
  ('00000000-0000-0000-0002-000000000005', 'Kubernetes', 'Beginner', 'published', 3),
  ('00000000-0000-0000-0002-000000000005', 'Git', 'Advanced', 'published', 4),
  ('00000000-0000-0000-0002-000000000005', 'GitHub', 'Advanced', 'published', 5),

  -- AI and Automation
  ('00000000-0000-0000-0002-000000000006', 'OpenAI API', 'Advanced', 'published', 1),
  ('00000000-0000-0000-0002-000000000006', 'Gemini API', 'Advanced', 'published', 2),
  ('00000000-0000-0000-0002-000000000006', 'DeepSeek API', 'Intermediate', 'published', 3),
  ('00000000-0000-0000-0002-000000000006', 'PyTorch', 'Intermediate', 'published', 4),
  ('00000000-0000-0000-0002-000000000006', 'YOLOv8', 'Advanced', 'published', 5),
  ('00000000-0000-0000-0002-000000000006', 'Hugging Face', 'Intermediate', 'published', 6),
  ('00000000-0000-0000-0002-000000000006', 'Selenium', 'Intermediate', 'published', 7),
  ('00000000-0000-0000-0002-000000000006', 'Web Scraping', 'Advanced', 'published', 8)
on conflict do nothing;

-- 5. Experiences
insert into public.experiences (id, role, company, type, location, start_date, end_date, is_current, bullets, logo_url, status, sort_order)
values
  (
    '00000000-0000-0000-0003-000000000001',
    'Software Engineering Intern',
    'Amdox Technologies',
    'Internship',
    'Remote',
    '3 months',
    'Present',
    true,
    array[
      'Worked on real-world software engineering tasks following enterprise-level development practices.',
      'Collaborated on coding, debugging, and improving software modules.',
      'Contributed to the Amdox AI Cloud ERP project integrating core modular services.'
    ],
    '/placeholder-logo.png',
    'published',
    1
  ),
  (
    '00000000-0000-0000-0003-000000000002',
    'Cloud Computing Intern',
    'FosterAI Technologies (AWS Cloud Internship)',
    'Internship',
    'Remote',
    '2 months',
    'Completed',
    false,
    array[
      'Built a Serverless Face Attendance System on AWS utilizing Lambda, Rekognition, and API Gateway.',
      'Gained hands-on experience with AWS services, serverless architecture, and production-ready deployments.'
    ],
    '/placeholder-logo.png',
    'published',
    2
  )
on conflict (id) do nothing;

-- 6. Education
insert into public.education (id, institution, degree, field, start_year, end_year, grade, status, content_status, sort_order)
values
  ('00000000-0000-0000-0004-000000000001', 'NSU University (Netaji Subhas University)', 'B.Tech', 'Computer Science Engineering', '2023', '2027', 'Pursuing', 'pursuing', 'published', 1),
  ('00000000-0000-0000-0004-000000000002', 'JAC Board', 'Intermediate (12th)', 'Science', '2021', '2023', '77%', 'completed', 'published', 2)
on conflict (id) do nothing;

-- 7. Achievements
insert into public.achievements (id, title, position, event, organizer, year, description, status, sort_order)
values
  ('00000000-0000-0000-0005-000000000001', '1st Position', 'Winner', 'Smart India Hackathon (SIH) Internal Hackathon', 'Internal University / SIH', '2024', 'Awarded 1st position for CityVision - AI Road Anomaly Detection system solving SIH26124.', 'published', 1),
  ('00000000-0000-0000-0005-000000000002', '2nd Position', '1st Runner Up', 'Agentic Premier League Hackathon', 'Google Developer Group Ranchi', '2024', 'Built IPL Akinator, an AI-powered guessing web app with deduction logic and TensorFlow/Gemini integration.', 'published', 2),
  ('00000000-0000-0000-0005-000000000003', 'Top 30 Finalist', 'Top 30 (among 2500+ teams)', 'Ranchi Hacks', 'Google Developer Group Ranchi', '2024', 'Selected in top 30 finalists out of 2500+ teams for SafeBrowse - AI-powered parental control and content safety.', 'published', 3)
on conflict (id) do nothing;

-- 8. Certificates
insert into public.certificates (
  id, title, issuer, issue_date, credential_id, file_url, file_type, category, visible, skills, instructor, duration, description, status, sort_order
)
values
  (
    '00000000-0000-0000-0006-000000000001',
    '2025 Python Crash Course For Absolute Beginners in Hindi',
    'Udemy',
    'January 10, 2025',
    'UC-9ecd1405-703d-4130-b3cf-6c02ae825861',
    '/certificates/python-crash-course.jpg',
    'image',
    'programming',
    true,
    array['Python', 'Programming Fundamentals', 'Hindi Language Learning', 'Beginner Programming'],
    'Vijay Patel',
    '3 total hours',
    'Comprehensive Python programming course designed for absolute beginners, taught in Hindi language for better understanding.',
    'published',
    1
  ),
  (
    '00000000-0000-0000-0006-000000000002',
    'JavaScript And PHP And Python Programming Complete Course',
    'Udemy',
    'November 11, 2024',
    'UC-463c2f71-3e0f-496b-bf2b-dffc8b3304ba',
    '/certificates/javascript-php-python.jpg',
    'image',
    'development',
    true,
    array['JavaScript', 'PHP', 'Python', 'Full Stack Development', 'Web Programming'],
    'PROPER DOT INSTITUTE',
    '8 total hours',
    'Complete programming course covering three major languages: JavaScript, PHP, and Python for full-stack web development.',
    'published',
    2
  ),
  (
    '00000000-0000-0000-0006-000000000003',
    'Learn HTML and CSS from Beginning to Advanced',
    'Udemy',
    'January 10, 2025',
    'UC-e1fb1d58-d987-4d43-8b0b-ff1253ff6a04',
    '/certificates/html-css-advanced.jpg',
    'image',
    'development',
    true,
    array['HTML', 'CSS', 'Web Design', 'Frontend Development', 'Responsive Design'],
    'Marcus Menti, Zechariah Tech',
    '5 total hours',
    'Comprehensive course covering HTML and CSS from basic concepts to advanced techniques for modern web development.',
    'published',
    3
  ),
  (
    '00000000-0000-0000-0006-000000000004',
    'AWS Cloud Internship Program',
    'FosterAI Technologies',
    '2024',
    'AWS-FOSTERAI-2024',
    '/placeholder.jpg',
    'image',
    'cloud',
    true,
    array['AWS', 'Serverless', 'Lambda', 'API Gateway', 'Cloud Architecture'],
    'FosterAI Mentors',
    '2 Months',
    'Hands-on cloud internship program covering serverless deployment, facial recognition pipelines, and AWS production infrastructure.',
    'published',
    4
  )
on conflict (id) do nothing;

-- 9. Projects (all 8 new + 2 existing from audit)
insert into public.projects (
  id, title, slug, summary, category, overview, problem, role, key_features, tech_stack, cover_url, gallery, award_badge, featured, status, sort_order
)
values
  (
    '00000000-0000-0000-0007-000000000001',
    'Amdox AI Cloud ERP',
    'amdox-ai-cloud-erp',
    'Enterprise ERP platform integrating finance, supply chain, HR, and payroll modules with Facebook Prophet business forecasting.',
    'Full Stack',
    'Amdox AI Cloud ERP is an enterprise-grade multi-tenant SaaS platform built to unify finance, supply chain operations, HR, and payroll into a deterministic, high-throughput management system.',
    'Traditional ERPs are expensive, disjointed, lack modern forecast intelligence, and pose multi-tenant security vulnerabilities.',
    'Full Stack Software Engineering Intern',
    array[
      'Enterprise ERP platform integrating finance, supply chain, HR, and payroll modules.',
      'Multi-tenant SaaS architecture with tenant isolation and a modular monolith design.',
      'Double-entry financial ledger with deterministic journal balancing, accounts payable, and accounts receivable.',
      'AI-powered business forecasting using Facebook Prophet.',
      'Interactive dashboards; API and end-to-end tests covering tenant isolation and audit logging.',
      'Documented containerized deployment using Docker and Kubernetes.'
    ],
    array['Next.js', 'React', 'TypeScript', 'NestJS', 'Python', 'Prophet', 'Docker', 'Kubernetes'],
    '/projects/taskflow-ai.jpg',
    '[{"url": "/projects/taskflow-ai.jpg", "alt": "Amdox AI ERP Dashboard"}]'::jsonb,
    'Enterprise Production',
    true,
    'published',
    1
  ),
  (
    '00000000-0000-0000-0007-000000000002',
    'CityVision - AI Road Anomaly Detection',
    'cityvision-ai-road-anomaly-detection',
    'Turns bus dashcam footage into automated road-monitoring data, detecting potholes, cracks, and road defects using YOLOv8 and EasyOCR.',
    'AI/ML',
    'CityVision transforms municipal transit into proactive road maintenance sensors. Powered by YOLOv8 and geospatial deduplication, it turns ordinary bus dashcams into automated citywide road inspection fleets.',
    'Manual road inspection is slow, dangerous, expensive, and leaves potholes untreated for months.',
    'Lead AI & Backend Developer',
    array[
      'Turns bus dashcam footage into road-monitoring data.',
      'Detects potholes, cracks, speed bumps, vehicles, traffic signs, and license plates with YOLOv8 and EasyOCR.',
      'ByteTrack object tracking, GPS-based incident mapping, and spatial deduplication of repeated defect sightings.',
      'Multi-bus verification and risk scoring to prioritize maintenance.',
      'Command-center dashboard with interactive GIS maps, analytics, and automated PDF work orders.'
    ],
    array['Python', 'FastAPI', 'React', 'TypeScript', 'YOLOv8', 'EasyOCR', 'PostgreSQL'],
    '/projects/pdf-wizard.jpg',
    '[{"url": "/projects/pdf-wizard.jpg", "alt": "CityVision GIS Command Center"}]'::jsonb,
    '1st Place SIH Internal',
    true,
    'published',
    2
  ),
  (
    '00000000-0000-0000-0007-000000000003',
    'CivicPulse - AI-Powered Civic Intelligence Platform',
    'civicpulse-ai-civic-intelligence',
    'Connects citizens with municipal authorities to report infrastructure hazards across India with Gemini Vision verification and GIS mapping.',
    'AI/ML',
    'CivicPulse is a civic engagement and governance intelligence platform enabling citizens to report civic grievances via voice, photo, and map coordinates, verified automatically by Google Gemini AI.',
    'Citizens struggle with bureaucratic grievance portals that lack verification and real-time tracking.',
    'Full Stack & AI Engineer',
    array[
      'Connects citizens with municipal authorities to report infrastructure hazards across India.',
      'Gemini Vision for AI-based image verification of hazards and resolution evidence.',
      'Multilingual voice-based complaint reporting and geospatial mapping of issues to wards.',
      'Workflows for complaint prioritization, escalation, and community-driven infrastructure planning.'
    ],
    array['TypeScript', 'Node.js', 'Firebase', 'Firestore', 'Gemini AI', 'OpenStreetMap'],
    '/projects/taskflow-ai.jpg',
    '[{"url": "/projects/taskflow-ai.jpg", "alt": "CivicPulse Hazard Map"}]'::jsonb,
    null,
    true,
    'published',
    3
  ),
  (
    '00000000-0000-0000-0007-000000000004',
    'SafeBrowse - AI-Powered Parental Control and Content Safety',
    'safebrowse-ai-content-safety',
    'Detects and filters harmful online content for young users using NLP and computer vision with context-aware, risk-based decisions.',
    'AI/ML',
    'SafeBrowse is a parental control application utilizing local and cloud-based deep learning models to screen toxic text, cyberbullying, and inappropriate imagery in real-time.',
    'Kids are exposed to harmful web content and traditional keyword filters suffer high false-positive rates.',
    'Mobile & Backend Developer',
    array[
      'Detects and filters harmful online content for young users using NLP and computer vision.',
      'Hugging Face toxic-text and NSFW image classification through a FastAPI backend with real-time inference.',
      'Context-aware, risk-based decisions (allow, blur, or block) to reduce false positives.',
      'JWT-secured backend with bcrypt password hashing; parent dashboard with child profiles, age-based controls, and activity logs.'
    ],
    array['React Native (Expo)', 'Python', 'FastAPI', 'PyTorch', 'Hugging Face', 'MongoDB'],
    '/projects/pdf-wizard.jpg',
    '[{"url": "/projects/pdf-wizard.jpg", "alt": "SafeBrowse Parent Dashboard"}]'::jsonb,
    'Top 30 Ranchi Hacks (2500+ teams)',
    true,
    'published',
    4
  ),
  (
    '00000000-0000-0000-0007-000000000005',
    'EmpirialProps - Prop Trading Firm Comparison Platform',
    'empirialprops-prop-firm-comparison',
    'Helps traders research and compare proprietary trading firms, funding programs, account types, and rules.',
    'FinTech',
    'EmpirialProps is a high-traffic FinTech comparison portal providing objective analytics, rule breakdown, and promotional discounts across top global prop trading firms.',
    'Prop traders face opaque fee structures, hidden drawdown rules, and fragmented firm comparison resources.',
    'Lead Full Stack Developer',
    array[
      'Helps traders research and compare proprietary trading firms, funding programs, account types, and rules.',
      'Dynamic content management and an admin dashboard for updating firm data without code changes.',
      'Technical SEO: metadata, robots.txt, and sitemap for prop firm comparison keywords.',
      'Fully responsive on desktop and mobile.'
    ],
    array['Next.js', 'React', 'TypeScript', 'Firebase'],
    '/projects/taskflow-ai.jpg',
    '[{"url": "/projects/taskflow-ai.jpg", "alt": "EmpirialProps Firm Compare"}]'::jsonb,
    null,
    false,
    'published',
    5
  ),
  (
    '00000000-0000-0000-0007-000000000006',
    'IPL Akinator',
    'ipl-akinator',
    'AI web app that guesses an IPL cricket player through dynamic questioning and deduction logic.',
    'AI',
    'IPL Akinator combines dynamic 20-questions tree algorithms with Gemini AI to predict which IPL cricket star the user is thinking of with minimal questions.',
    'Creating an intuitive sports trivia experience powered by adaptive conversational logic.',
    'Full Stack & AI Developer',
    array[
      'Dynamic 20-questions decision tree logic.',
      'Gemini AI reasoning for ambiguous cricket statistics.',
      'MongoDB database of historical player performance and team rosters.',
      'Interactive cricket animations and responsive UI.'
    ],
    array['React', 'FastAPI', 'MongoDB', 'TensorFlow', 'Gemini AI'],
    '/projects/pdf-wizard.jpg',
    '[{"url": "/projects/pdf-wizard.jpg", "alt": "IPL Akinator Game Screen"}]'::jsonb,
    '2nd Position GDG Ranchi',
    false,
    'published',
    6
  ),
  (
    '00000000-0000-0000-0007-000000000007',
    'HealthAI',
    'healthai',
    'Healthcare web app with AI-driven health insights and intelligent symptom evaluation.',
    'Web',
    'HealthAI bridges clinical queries with intelligent symptom checking and medical appointment scheduling.',
    'Difficulty in receiving quick, preliminary health consultations and understanding laboratory metrics.',
    'Web & AI Developer',
    array[
      'AI-driven preliminary health insights and symptom screening.',
      'Secure patient report storage and medical history management.',
      'Doctor appointment scheduling and reminder alerts.'
    ],
    array['React', 'PHP', 'MySQL', 'AI Integration'],
    '/projects/taskflow-ai.jpg',
    '[{"url": "/projects/taskflow-ai.jpg", "alt": "HealthAI Patient Dashboard"}]'::jsonb,
    null,
    false,
    'published',
    7
  ),
  (
    '00000000-0000-0000-0007-000000000008',
    'Creatorly',
    'creatorly',
    'Responsive web platform for creators with smooth animations, portfolio showcases, and fast load times.',
    'Frontend',
    'Creatorly is a modern creator hub allowing digital content creators to present their brand, media kits, and sponsorship links with sleek Framer Motion animations.',
    'Creators need high-converting, lightning-fast landing pages with eye-catching aesthetics.',
    'Frontend Engineer',
    array[
      'Responsive layout optimized for mobile and desktop screens.',
      'Custom Framer Motion spring physics and scroll triggers.',
      'Fast bundle size and optimized Google Fonts loading.'
    ],
    array['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    '/projects/pdf-wizard.jpg',
    '[{"url": "/projects/pdf-wizard.jpg", "alt": "Creatorly Showcase"}]'::jsonb,
    null,
    false,
    'published',
    8
  ),
  (
    '00000000-0000-0000-0007-000000000009',
    'TaskFlow AI',
    'taskflow-ai',
    'An intelligent task management companion with AI planning, focus timer, and gamification features.',
    'Full Stack',
    'An intelligent task management companion with AI planning, focus timer, and gamification features. Built with modern web technologies for optimal productivity.',
    'Managing complex daily schedules without proactive AI prioritization leads to burnout.',
    'Full Stack Creator',
    array[
      'AI-powered task planning',
      'Focus timer functionality',
      'Gamification elements',
      'Intelligent task management'
    ],
    array['React', 'JavaScript', 'CSS', 'AI Integration'],
    '/projects/taskflow-ai.jpg',
    '[{"url": "/projects/taskflow-ai.jpg", "alt": "TaskFlow AI Interface"}]'::jsonb,
    null,
    false,
    'published',
    9
  ),
  (
    '00000000-0000-0000-0007-000000000010',
    'PDF Wizard',
    'pdf-wizard',
    'A comprehensive PDF toolkit offering merge, split, compress, convert, protect, and OCR functionality.',
    'Tools',
    'A comprehensive PDF toolkit offering merge, split, compress, convert, protect, and OCR functionality. Fast, secure, and free to use for all your PDF needs.',
    'Online PDF utilities frequently charge subscription fees or violate user privacy by uploading documents to external servers.',
    'Web Tools Developer',
    array[
      'PDF merging & splitting',
      'File compression',
      'Format conversion',
      'Password protection & OCR'
    ],
    array['JavaScript', 'PDF.js', 'Web APIs', 'File Processing'],
    '/projects/pdf-wizard.jpg',
    '[{"url": "/projects/pdf-wizard.jpg", "alt": "PDF Wizard Toolkit"}]'::jsonb,
    null,
    false,
    'published',
    10
  )
on conflict (id) do nothing;

-- 10. Resumes
insert into public.resumes (id, label, file_url, is_active, status, sort_order)
values (
  '00000000-0000-0000-0009-000000000001',
  'Md Arsh Eqbal - Resume 2025',
  'https://drive.google.com/file/d/19ChCkUncuWgthhgDlrCW6f8isU_ChsLz/view?usp=drivesdk',
  true,
  'published',
  1
)
on conflict (id) do nothing;

-- 11. Testimonials
insert into public.testimonials (id, name, role, text, avatar, status, sort_order)
values
  ('00000000-0000-0000-0008-000000000001', 'Sarah Johnson', 'Project Manager', 'Arsh delivered an exceptional website that exceeded our expectations. His attention to detail and problem-solving skills are impressive.', '/placeholder.svg?height=80&width=80', 'published', 1),
  ('00000000-0000-0000-0008-000000000002', 'Michael Chen', 'Startup Founder', 'Working with Arsh was a pleasure. He understood our vision perfectly and translated it into a functional, beautiful product.', '/placeholder.svg?height=80&width=80', 'published', 2)
on conflict (id) do nothing;

-- 12. Page Sections
insert into public.page_sections (id, key, title, subtitle, enabled, status, sort_order)
values
  ('00000000-0000-0000-0010-000000000001', 'hero', 'Hello, I''m Md Arsh Eqbal', 'Full Stack Web Developer & AI Enthusiast', true, 'published', 1),
  ('00000000-0000-0000-0010-000000000002', 'about', 'About Me', 'Passionate developer, student, and creative problem solver.', true, 'published', 2),
  ('00000000-0000-0000-0010-000000000003', 'projects', 'Featured Projects', 'I''ve worked on various projects that solve real-world problems. Here are some of my notable ones.', true, 'published', 3),
  ('00000000-0000-0000-0010-000000000004', 'skills', 'Skills & Technologies', 'I work with a variety of technologies and continuously expand my skill set.', true, 'published', 4),
  ('00000000-0000-0000-0010-000000000005', 'certificates', 'My Certificates', 'I''m constantly learning and improving my skills through various courses and certifications.', true, 'published', 5),
  ('00000000-0000-0000-0010-000000000006', 'feedback', 'Share Your Feedback', 'Your thoughts and suggestions help me improve. I''d love to hear from you!', true, 'published', 6),
  ('00000000-0000-0000-0010-000000000007', 'testimonials', 'What People Say', 'Feedback from clients and collaborators I''ve worked with.', true, 'published', 7),
  ('00000000-0000-0000-0010-000000000008', 'contact', 'Let''s Connect', 'Ready to build something impactful together? Let''s connect and collaborate!', true, 'published', 8)
on conflict (id) do nothing;
