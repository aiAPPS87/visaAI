-- visaAI Visa Database Seed Data
-- Run after schema.sql in your Supabase SQL editor

insert into public.visa_database (country, visa_name, visa_code, category, description, requirements, processing_time, cost_usd, official_url) values

-- UNITED STATES
('US', 'H-1B Specialty Occupation', 'H-1B', 'work',
 'For workers in specialty occupations requiring at least a bachelor''s degree. Subject to annual lottery.',
 '{"degree": "Bachelor''s or higher in specialty field", "employer_sponsorship": "Required", "lottery": "Annual cap applies", "salary": "Prevailing wage required"}',
 '3-6 months (premium processing: 2-3 weeks)', 3000, 'https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations'),

('US', 'O-1A Extraordinary Ability', 'O-1A', 'work',
 'For individuals with extraordinary ability in sciences, education, business, or athletics.',
 '{"evidence": "Sustained national/international acclaim", "criteria": "Meet 3 of 8 criteria", "employer": "Petitioner or agent required", "no_cap": "No annual cap or lottery"}',
 '2-4 months (premium processing: 2-3 weeks)', 2500, 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement'),

('US', 'L-1 Intracompany Transferee', 'L-1', 'work',
 'For managers, executives, or specialized knowledge employees transferring within a multinational company.',
 '{"employment": "1 year with same company in past 3 years", "role": "Manager, executive, or specialized knowledge", "employer": "Multinational company required"}',
 '2-4 months', 2000, 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1a-intracompany-transferee-executive-or-manager'),

('US', 'EB-1A Extraordinary Ability Green Card', 'EB-1A', 'work',
 'Permanent residency for individuals with extraordinary ability. Self-petition allowed.',
 '{"acclaim": "Extraordinary ability evidence required", "criteria": "Meet 3 of 10 criteria", "self_petition": "No employer required", "perm": "No labor certification needed"}',
 '12-24 months', 700, 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1'),

('US', 'EB-2 National Interest Waiver', 'EB-2-NIW', 'work',
 'Green card for professionals with advanced degrees or exceptional ability who benefit US national interest.',
 '{"degree": "Advanced degree or exceptional ability", "national_interest": "Work must benefit US national interest", "self_petition": "No employer required"}',
 '18-36 months', 700, 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2'),

('US', 'F-1 Student Visa', 'F-1', 'study',
 'For full-time students at accredited US universities and colleges.',
 '{"admission": "Acceptance to SEVP-certified school", "finances": "Proof of sufficient funds", "intent": "Non-immigrant intent required", "sevis": "SEVIS fee required"}',
 '2-4 weeks after I-20', 350, 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html'),

('US', 'IR-1/CR-1 Spouse of US Citizen', 'IR-1', 'family',
 'Immigrant visa (green card) for spouses of US citizens. No annual cap.',
 '{"sponsor": "US citizen spouse required", "marriage": "Bona fide marriage required", "income": "Sponsor must meet income requirements"}',
 '12-24 months', 1200, 'https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration.html'),

('US', 'E-2 Treaty Investor', 'E-2', 'investment',
 'For investors from treaty countries making substantial investment in a US business.',
 '{"treaty": "Must be from treaty country", "investment": "Substantial investment required (typically $100K+)", "business": "Active role in business required"}',
 '2-4 months', 500, 'https://travel.state.gov/content/travel/en/us-visas/employment/treaty-trader-investor.html'),

('US', 'B-1/B-2 Visitor', 'B-1/B-2', 'visitor',
 'For temporary visitors for business (B-1) or tourism/pleasure (B-2).',
 '{"intent": "Non-immigrant intent required", "ties": "Strong home country ties", "funds": "Sufficient funds for stay", "duration": "Up to 6 months"}',
 '2-4 weeks', 185, 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html'),

-- CANADA
('Canada', 'Express Entry - Federal Skilled Worker', 'EE-FSW', 'work',
 'Points-based immigration system for skilled workers. Managed through Comprehensive Ranking System (CRS).',
 '{"experience": "1 year skilled work experience", "education": "Post-secondary education", "language": "CLB 7+ in English or French", "crs_score": "Competitive CRS score required (typically 450+)"}',
 '6 months from ITA', 1365, 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html'),

('Canada', 'Canadian Experience Class', 'CEC', 'work',
 'For temporary workers and international graduates with Canadian work experience.',
 '{"experience": "1 year Canadian work experience in NOC 0/A/B", "language": "CLB 7+ for NOC 0/A or CLB 5+ for NOC B", "residency": "Must be in Canada or a foreign national"}',
 '6 months', 1365, 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/canadian-experience-class.html'),

('Canada', 'Provincial Nominee Program', 'PNP', 'work',
 'Each Canadian province nominates immigrants to meet local labor market needs.',
 '{"job_offer": "Often required (province-specific)", "experience": "Skilled work experience", "connection": "Connection to province (job offer, education, family)"}',
 '6-18 months', 1500, 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html'),

('Canada', 'Start-Up Visa', 'SUV', 'investment',
 'For innovative entrepreneurs with support from designated Canadian investors or accelerators.',
 '{"support": "Letter of support from designated organization", "language": "CLB 5+", "funds": "Settlement funds required", "idea": "Innovative business concept"}',
 '12-16 months', 1565, 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html'),

('Canada', 'Spousal Sponsorship', 'SPON-CA', 'family',
 'Canadian citizens or PRs can sponsor their spouse or common-law partner.',
 '{"sponsor": "Canadian citizen or PR aged 18+", "relationship": "Marriage or common-law (1+ year)", "income": "Must meet minimum income (some exceptions)"}',
 '12 months', 1080, 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children.html'),

-- UNITED KINGDOM
('UK', 'Skilled Worker Visa', 'UK-SW', 'work',
 'For skilled workers with a job offer from a UK employer. Replaced the Tier 2 General visa.',
 '{"job_offer": "Approved employer sponsor required", "skill_level": "RQF Level 3 or above", "salary": "Meet minimum salary threshold (£26,200 or going rate)", "english": "B1 English required"}',
 '3-8 weeks', 719, 'https://www.gov.uk/skilled-worker-visa'),

('UK', 'Global Talent Visa', 'UK-GT', 'work',
 'For leaders and potential leaders in academia, research, arts, culture, or digital technology.',
 '{"endorsement": "Endorsement from approved body required", "talent": "Exceptional talent or exceptional promise", "no_job_offer": "No job offer required"}',
 '3-8 weeks', 623, 'https://www.gov.uk/global-talent'),

('UK', 'High Potential Individual Visa', 'UK-HPI', 'work',
 'For recent graduates from top global universities. No job offer required.',
 '{"degree": "Degree from eligible global university in last 5 years", "english": "B1 English", "funds": "£2,530 maintenance funds"}',
 '3-8 weeks', 715, 'https://www.gov.uk/high-potential-individual-visa'),

('UK', 'Innovator Founder Visa', 'UK-IF', 'investment',
 'For experienced entrepreneurs wanting to set up an innovative, viable and scalable business.',
 '{"endorsement": "Endorsement from approved body", "innovation": "Innovative, viable, scalable business idea", "english": "B2 English", "funds": "£50,000+ investment (exceptions apply)"}',
 '3-8 weeks', 1486, 'https://www.gov.uk/innovator-founder-visa'),

('UK', 'Student Visa', 'UK-ST', 'study',
 'For students aged 16+ studying at a UK Higher Education Provider.',
 '{"acceptance": "CAS from licensed UK institution", "english": "B2 English", "funds": "Tuition + living costs proof", "course": "Full-time degree-level course"}',
 '3 weeks', 490, 'https://www.gov.uk/student-visa'),

-- AUSTRALIA
('Australia', 'Skilled Independent (Subclass 189)', 'AU-189', 'work',
 'Points-tested permanent residency. No state sponsorship or employer required.',
 '{"points": "65+ points on skills assessment", "occupation": "In-demand occupation on skills list", "age": "Under 45", "english": "Competent English"}',
 '12-24 months', 4640, 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189'),

('Australia', 'Skilled Nominated (Subclass 190)', 'AU-190', 'work',
 'Points-tested permanent residency with state/territory nomination (extra 5 points).',
 '{"points": "65+ points", "nomination": "State or territory nomination", "occupation": "On state migration occupation list", "english": "Competent English"}',
 '12-24 months', 4640, 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190'),

('Australia', 'Employer Sponsored (Subclass 482)', 'AU-482', 'work',
 'Temporary Skill Shortage visa for employer-sponsored workers.',
 '{"employer": "Approved employer sponsor", "occupation": "On short or medium-long term skills list", "experience": "2 years relevant experience", "english": "Competent English"}',
 '1-4 months', 1455, 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482'),

('Australia', 'Global Talent Independent', 'AU-GTI', 'work',
 'Fast-track permanent residency for highly skilled professionals in target sectors.',
 '{"talent": "Outstanding achievement in target sector", "salary": "High salary threshold", "nomination": "Nominator in Australia required", "sector": "Must be in target sector"}',
 '2-3 months', 4640, 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/global-talent-independent-858'),

('Australia', 'Student Visa (Subclass 500)', 'AU-500', 'study',
 'For students enrolled in a registered course at an Australian education provider.',
 '{"enrollment": "Enrolled in CRICOS-registered course", "funds": "Proof of funds for tuition and living", "english": "Course-specific English requirement", "health": "Health insurance (OSHC) required"}',
 '4-6 weeks', 710, 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500'),

-- GERMANY
('Germany', 'EU Blue Card', 'DE-BC', 'work',
 'Work and residence permit for non-EU professionals with recognized university degree and job offer.',
 '{"degree": "Recognized university degree", "job_offer": "Job offer with salary €56,400+/yr (shortage: €43,992+)", "qualification": "Degree relevant to job"}',
 '4-8 weeks', 140, 'https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card'),

('Germany', 'Skilled Immigration Visa', 'DE-SIV', 'work',
 'For qualified professionals with German or recognized foreign vocational qualification.',
 '{"qualification": "German-recognized vocational training or degree", "job_offer": "Concrete job offer", "german": "German language skills often helpful"}',
 '4-12 weeks', 75, 'https://www.make-it-in-germany.com/en/visa-residence/types/skilled-immigration'),

('Germany', 'Job Seeker Visa', 'DE-JSV', 'work',
 'Allows qualified professionals to enter Germany to look for a job for up to 6 months.',
 '{"degree": "Recognized university degree or vocational training", "funds": "Sufficient funds for stay", "language": "German or English skills", "intent": "Intent to find qualifying employment"}',
 '2-6 weeks', 75, 'https://www.make-it-in-germany.com/en/visa-residence/types/job-seeker'),

('Germany', 'Freelancer Visa', 'DE-FV', 'work',
 'For self-employed professionals and freelancers in creative or specialized fields.',
 '{"profession": "Freelance or self-employed activity allowed", "clients": "Clients or contracts in Germany", "finances": "Proof of income sustainability", "registration": "German freelancer registration required"}',
 '4-8 weeks', 75, 'https://www.make-it-in-germany.com/en/visa-residence/types/self-employed-freelancers'),

('Germany', 'Student Visa', 'DE-STUD', 'study',
 'For international students enrolled or applying to German universities.',
 '{"admission": "University acceptance letter", "funds": "€934/month blocked account or guarantee", "language": "German or English depending on program", "insurance": "Health insurance required"}',
 '4-8 weeks', 75, 'https://www.make-it-in-germany.com/en/visa-residence/types/student'),

('Germany', 'Family Reunification', 'DE-FAM', 'family',
 'For family members of German residents or citizens to join them in Germany.',
 '{"sponsor": "Family member legally residing in Germany", "relationship": "Spouse, minor child, or parent of minor", "accommodation": "Adequate housing", "language": "Basic German (A1) for spouses usually required"}',
 '4-12 weeks', 75, 'https://www.make-it-in-germany.com/en/visa-residence/types/family-reunification');
