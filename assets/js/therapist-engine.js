/**
 * PhysioLife - Centralized Therapist Engine & Doctor Profile Router
 * Manages doctor dataset (16 Unique Board-Certified Specialists), dynamic URL query routing (?id=<therapist-id>),
 * and client-side rendering on therapist-details.html.
 * Author: Antigravity
 * Version: 2.0.0
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Centralized Doctors Database (16 Unique Board-Certified Clinical Leads)
  // =========================================================================
  const THERAPISTS_DATA = {
    "jenkins": {
        "id": "jenkins",
        "name": "Dr. Sarah Jenkins",
        "fullName": "Dr. Sarah Jenkins, PT, DPT, OCS",
        "titleRole": "Board-Certified Orthopedic Clinical Specialist & Spine Director",
        "sidebarRole": "Orthopedic & Spine Lead",
        "image": "assets/images/therapist-jenkins.jpg",
        "heroImage": "assets/images/service-spine.jpg",
        "heroAlt": "Dr. Sarah Jenkins in the Advanced Spine Rehabilitation & Decompression Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Spine & Sciatica (OCS)",
        "experience": "12+ Years Clinical",
        "rating": "4.9 / 5.0 (340 Reviews)",
        "languages": "English, Spanish",
        "hours": {
            "monWed": "7:30 AM – 3:30 PM",
            "thuFri": "11:00 AM – 7:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Clinical Philosophy",
        "bioParagraphs": [
            "Dr. Sarah Jenkins received her Doctorate in Physical Therapy (DPT) from Columbia University College of Physicians and Surgeons with highest clinical honors. She subsequently completed a rigorous 2-year clinical residency in Orthopedic Physical Therapy, earning her prestigious Board Certification as an Orthopedic Clinical Specialist (OCS).",
            "Dr. Jenkins believes in empowering patients through mechanical education: \"When patients understand the anatomical mechanism of their disc or facet irritation, recovery shifts from passive waiting to proactive rehabilitation.\" Over her 12-year tenure, she has successfully guided more than 4,200 patients out of chronic lumbar and cervical pain."
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "Columbia University",
                "desc": "Doctor of Physical Therapy (DPT), Magna Cum Laude"
            },
            {
                "icon": "fas fa-certificate",
                "color": "text-secondary",
                "title": "American Board of Physical Therapy",
                "desc": "Board-Certified Orthopedic Clinical Specialist (OCS)"
            },
            {
                "icon": "fas fa-check-circle",
                "color": "text-success",
                "title": "The McKenzie Institute USA",
                "desc": "Certified in Mechanical Diagnosis and Therapy (Cert. MDT)"
            },
            {
                "icon": "fas fa-syringe",
                "color": "text-info",
                "title": "Integrative Dry Needling Institute",
                "desc": "Certified Myofascial Trigger Point Dry Needling (CIDN)"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Sarah Jenkins",
        "bookingSubtitle": "Complete this form to reserve an evaluation block directly with Dr. Jenkins.",
        "successMsg": "Evaluation request received for Dr. Jenkins! We will call you within 15 minutes."
    },
    "vance": {
        "id": "vance",
        "name": "Dr. Marcus Vance",
        "fullName": "Dr. Marcus Vance, PT, DPT, SCS",
        "titleRole": "Board-Certified Sports Clinical Specialist & Athletic Performance Director",
        "sidebarRole": "Sports Medicine & Return-to-Play Lead",
        "image": "assets/images/therapist-vance.jpg",
        "heroImage": "assets/images/service-sports.jpg",
        "heroAlt": "Dr. Marcus Vance in the High-Performance Athletic Rehabilitation Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Sports Injury & Kinetic Chain (SCS)",
        "experience": "10+ Years Clinical",
        "rating": "4.9 / 5.0 (295 Reviews)",
        "languages": "English",
        "hours": {
            "monWed": "8:00 AM – 4:00 PM",
            "thuFri": "10:00 AM – 6:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Athletic Rehabilitation Philosophy",
        "bioParagraphs": [
            "Dr. Marcus Vance earned his Doctorate in Physical Therapy from the University of Southern California (USC), ranking among the nation's premier sports medicine divisions. He completed an advanced Sports Physical Therapy Fellowship, providing direct sideline and post-operative clinical care for NCAA Division I collegiate athletes and professional competitors.",
            "Dr. Vance's clinical philosophy centers on kinetic symmetry and objective return-to-sport metrics: \"Rehabilitation is not simply the absence of pain; it is restoring reactive force production and neuromuscular deceleration so athletes return to their sport stronger than before their injury.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "University of Southern California",
                "desc": "Doctor of Physical Therapy (DPT), Sports Specialization"
            },
            {
                "icon": "fas fa-award",
                "color": "text-secondary",
                "title": "American Board of Physical Therapy",
                "desc": "Board-Certified Sports Clinical Specialist (SCS)"
            },
            {
                "icon": "fas fa-running",
                "color": "text-success",
                "title": "Titleist Performance Institute",
                "desc": "TPI Certified Rotational & Overhead Biomechanics"
            },
            {
                "icon": "fas fa-stopwatch-20",
                "color": "text-info",
                "title": "Owens Recovery Science",
                "desc": "Certified Blood Flow Restriction (BFR) Practitioner"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Marcus Vance",
        "bookingSubtitle": "Complete this form to reserve an evaluation block directly with Dr. Vance.",
        "successMsg": "Evaluation request received for Dr. Vance! We will call you within 15 minutes."
    },
    "chen": {
        "id": "chen",
        "name": "Dr. David Chen",
        "fullName": "Dr. David Chen, PT, CMPT",
        "titleRole": "Certified Manual Physical Therapist & Joint Arthroplasty Lead",
        "sidebarRole": "Joint Arthroplasty & Post-Surgical Lead",
        "image": "assets/images/therapist-chen.jpg",
        "heroImage": "assets/images/service-posture.jpg",
        "heroAlt": "Dr. David Chen in the Workplace Ergonomics & Biomechanical Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Joint Arthroplasty & Manual Mobilization (CMPT)",
        "experience": "9+ Years Clinical",
        "rating": "4.9 / 5.0 (280 Reviews)",
        "languages": "English, Mandarin",
        "hours": {
            "monWed": "8:00 AM – 4:00 PM",
            "thuFri": "11:00 AM – 7:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Post-Surgical Arthroplasty Philosophy",
        "bioParagraphs": [
            "Dr. David Chen earned his Doctorate in Physical Therapy from New York University (NYU) Steinhardt, followed by advanced residency training through the North American Institute of Orthopaedic Manual Therapy (NAIOMT). He is a Certified Manipulative Physical Therapist (CMPT) specializing in joint kinematics and tissue healing phases.",
            "Dr. Chen works directly with leading orthopedic surgeons to translate surgical operative notes into progressive, pain-sparing rehabilitation: \"Precision hands-on joint glide mobilization combined with early active-assisted movement preserves surgical integrity while preventing arthrofibrosis and stiffness.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "New York University",
                "desc": "Doctor of Physical Therapy (DPT), Orthopedic Focus"
            },
            {
                "icon": "fas fa-hands-helping",
                "color": "text-secondary",
                "title": "NAIOMT Manual Institute",
                "desc": "Certified Manipulative Physical Therapist (CMPT)"
            },
            {
                "icon": "fas fa-procedures",
                "color": "text-success",
                "title": "Hospital for Special Surgery",
                "desc": "Advanced Arthroplasty Post-Op Rehabilitation Fellow"
            },
            {
                "icon": "fas fa-tape",
                "color": "text-info",
                "title": "Kinesio Taping Association",
                "desc": "Certified Kinesio Taping Practitioner (CKTP) - Edema"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. David Chen",
        "bookingSubtitle": "Complete this form to reserve an evaluation block directly with Dr. Chen.",
        "successMsg": "Evaluation request received for Dr. Chen! We will call you within 15 minutes."
    },
    "bennett": {
        "id": "bennett",
        "name": "Dr. Chloe Bennett",
        "fullName": "Dr. Chloe Bennett, PT, DPT, PRPC",
        "titleRole": "Chronic Pain Neurobiology & Central Sensitization Specialist",
        "sidebarRole": "Chronic Pain & Desensitization Lead",
        "image": "assets/images/therapist-bennett.jpg",
        "heroImage": "assets/images/service-chronic.jpg",
        "heroAlt": "Dr. Chloe Bennett in the Integrative Myofascial Therapy & Trigger Point Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Chronic Pain & Central Sensitization (PRPC)",
        "experience": "11+ Years Clinical",
        "rating": "5.0 / 5.0 (310 Reviews)",
        "languages": "English, French",
        "hours": {
            "monWed": "8:30 AM – 4:30 PM",
            "thuFri": "10:00 AM – 6:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Pain Science Clinical Philosophy",
        "bioParagraphs": [
            "Dr. Chloe Bennett received her Doctorate in Physical Therapy from Duke University School of Medicine, followed by specialized clinical training at the International Spine & Pain Institute. She is a recognized clinical authority on chronic pain neuroplasticity, graded motor imagery, and autonomic nervous system regulation.",
            "Dr. Bennett approaches chronic musculoskeletal symptoms through a pain-neuroscience framework: \"Persistent pain alters how the brain maps the body. By retraining nociceptive thresholds, calming systemic inflammation, and gently rebuilding movement confidence, patients break free from the vicious pain-fear cycle.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "Duke University School of Medicine",
                "desc": "Doctor of Physical Therapy (DPT), Pain Science Honors"
            },
            {
                "icon": "fas fa-brain",
                "color": "text-secondary",
                "title": "International Spine & Pain Institute",
                "desc": "Therapeutic Pain Specialist (TPS Certification)"
            },
            {
                "icon": "fas fa-heartbeat",
                "color": "text-success",
                "title": "Herman & Wallace Pelvic Rehab",
                "desc": "Pelvic Rehabilitation Practitioner Certified (PRPC)"
            },
            {
                "icon": "fas fa-bolt",
                "color": "text-info",
                "title": "American Physical Therapy Association",
                "desc": "Graded Motor Imagery & Neurodynamics Credential"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Chloe Bennett",
        "bookingSubtitle": "Complete this form to reserve an evaluation block directly with Dr. Bennett.",
        "successMsg": "Evaluation request received for Dr. Bennett! We will call you within 15 minutes."
    },
    "reed": {
        "id": "reed",
        "name": "Dr. Julian Reed",
        "fullName": "Dr. Julian Reed, PT, DPT, RMSK",
        "titleRole": "Musculoskeletal Ultrasound & Joint Degeneration Lead",
        "sidebarRole": "Joint Rehabilitation & Cartilage Lead",
        "image": "assets/images/therapist-reed.jpg",
        "heroImage": "assets/images/service-joint.jpg",
        "heroAlt": "Dr. Julian Reed in the Orthopedic Joint Kinematics & Arthroplasty Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Joint Preservation & Ultrasound (RMSK)",
        "experience": "10+ Years Clinical",
        "rating": "4.9 / 5.0 (275 Reviews)",
        "languages": "English",
        "hours": {
            "monWed": "7:00 AM – 3:00 PM",
            "thuFri": "9:00 AM – 5:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Joint Cartilage Preservation Philosophy",
        "bioParagraphs": [
            "Dr. Julian Reed completed his Doctorate in Physical Therapy at Emory University School of Medicine. He subsequently completed fellowship training in diagnostic musculoskeletal sonography, earning the prestigious Registered in Musculoskeletal (RMSK) sonography credential.",
            "Dr. Reed specializes in non-operative joint preservation for osteoarthritic knees, impinged hips, and frozen shoulders: \"Joint cartilage thrives on appropriate cyclic hydrodynamic compression. By restoring true physiological joint tracking and offloading degenerated compartments, we delay or prevent invasive joint arthroplasty.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "Emory University School of Medicine",
                "desc": "Doctor of Physical Therapy (DPT), Joint Mechanics Track"
            },
            {
                "icon": "fas fa-wave-square",
                "color": "text-secondary",
                "title": "APCA Registry",
                "desc": "Registered in Musculoskeletal Sonography (RMSK)"
            },
            {
                "icon": "fas fa-bone",
                "color": "text-success",
                "title": "Maitland-Australian Physiotherapy Seminars",
                "desc": "Certified Orthopedic Manual Therapist (COMT)"
            },
            {
                "icon": "fas fa-compress-arrows-alt",
                "color": "text-info",
                "title": "Mulligan Concept Teachers Association",
                "desc": "Certified Mulligan Practitioner (CMP)"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Julian Reed",
        "bookingSubtitle": "Complete this form to reserve an evaluation block directly with Dr. Reed.",
        "successMsg": "Evaluation request received for Dr. Reed! We will call you within 15 minutes."
    },
    "gallagher": {
        "id": "gallagher",
        "name": "Dr. Liam Gallagher",
        "fullName": "Dr. Liam Gallagher, PT, DPT, CSCS",
        "titleRole": "Myofascial Release & Dynamic Mobility Lead",
        "sidebarRole": "Functional Mobility & Soft Tissue Lead",
        "image": "assets/images/therapist-gallagher.jpg",
        "heroImage": "assets/images/service-mobility.jpg",
        "heroAlt": "Dr. Liam Gallagher in the Clinical Neurodynamics & Manual Therapy Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Myofascial Release & Functional Mobility (CSCS)",
        "experience": "8+ Years Clinical",
        "rating": "4.9 / 5.0 (260 Reviews)",
        "languages": "English",
        "hours": {
            "monWed": "9:00 AM – 5:00 PM",
            "thuFri": "11:00 AM – 7:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Kinetic Freedom Philosophy",
        "bioParagraphs": [
            "Dr. Liam Gallagher received his Doctorate in Physical Therapy from the University of Pittsburgh, internationally known for movement science research. Prior to joining PhysioLife, he served as a strength and conditioning specialist for collegiate rugby and track athletes.",
            "Dr. Gallagher focuses on whole-body fascial integrity: \"Isolated muscle stretching rarely cures chronic tightness. We must release neuro-fascial adhesions, restore thoracic rotational mobility, and re-engage dormant stabilizing stabilizers to unlock effortless, pain-free athletic movement.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "University of Pittsburgh",
                "desc": "Doctor of Physical Therapy (DPT), Movement Science"
            },
            {
                "icon": "fas fa-dumbbell",
                "color": "text-secondary",
                "title": "National Strength & Conditioning Association",
                "desc": "Certified Strength & Conditioning Specialist (CSCS)"
            },
            {
                "icon": "fas fa-tools",
                "color": "text-success",
                "title": "Graston Technique USA",
                "desc": "Certified Instrument-Assisted Soft Tissue Mobilization (GTS)"
            },
            {
                "icon": "fas fa-feather",
                "color": "text-info",
                "title": "Functional Movement Systems",
                "desc": "FMS Level 2 Certified Movement Specialist"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Liam Gallagher",
        "bookingSubtitle": "Complete this form to reserve an evaluation block directly with Dr. Gallagher.",
        "successMsg": "Evaluation request received for Dr. Gallagher! We will call you within 15 minutes."
    },
    "rostova": {
        "id": "rostova",
        "name": "Dr. Elena Rostova",
        "fullName": "Dr. Elena Rostova, PT, NCS",
        "titleRole": "Board-Certified Neurological Specialist & Vestibular Director",
        "sidebarRole": "Neurological & Neuroplasticity Lead",
        "image": "assets/images/therapist-rostova.jpg",
        "heroImage": "assets/images/service-neuro.jpg",
        "heroAlt": "Dr. Elena Rostova in the Neurological Gait & Balance Recovery Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Neurology & Neuro-Motor Recovery (NCS)",
        "experience": "14+ Years Clinical",
        "rating": "5.0 / 5.0 (410 Reviews)",
        "languages": "English, Russian",
        "hours": {
            "monWed": "7:00 AM – 3:00 PM",
            "thuFri": "9:00 AM – 5:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Neuroplasticity Philosophy",
        "bioParagraphs": [
            "Dr. Elena Rostova earned her Doctorate in Physical Therapy with highest clinical honors from Northwestern University Feinberg School of Medicine. She is one of fewer than 3,500 physical therapists nationwide to hold the distinguished credential of Board-Certified Neurological Clinical Specialist (NCS).",
            "Dr. Rostova is an outspoken champion of neuroplastic recovery at every life stage: \"The nervous system retains an astounding capacity to reorganize and forge alternative pathways when challenged with high-repetition, meaningful functional tasks.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "Northwestern University",
                "desc": "Doctor of Physical Therapy (DPT), Neuro-Rehab Honors"
            },
            {
                "icon": "fas fa-brain",
                "color": "text-secondary",
                "title": "American Board of Physical Therapy",
                "desc": "Board-Certified Neurological Clinical Specialist (NCS)"
            },
            {
                "icon": "fas fa-compass",
                "color": "text-success",
                "title": "Emory University School of Medicine",
                "desc": "Advanced Competency in Vestibular Rehabilitation (VRT)"
            },
            {
                "icon": "fas fa-walking",
                "color": "text-info",
                "title": "LSVT Global Organization",
                "desc": "Certified LSVT BIG Practitioner for Parkinson’s Disease"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Elena Rostova",
        "bookingSubtitle": "Complete this form to reserve an evaluation block directly with Dr. Rostova.",
        "successMsg": "Evaluation request received for Dr. Rostova! We will call you within 15 minutes."
    },
    "hayes": {
        "id": "hayes",
        "name": "Dr. Robert Hayes",
        "fullName": "Dr. Robert Hayes, PT, DPT, GCS",
        "titleRole": "Board-Certified Geriatric Clinical Specialist & Fall Prevention Lead",
        "sidebarRole": "Senior Physiotherapy & Fall Prevention Lead",
        "image": "assets/images/therapist-hayes.jpg",
        "heroImage": "assets/images/service-postop.jpg",
        "heroAlt": "Dr. Robert Hayes in the Post-Arthroplasty Mobility & Gait Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Geriatrics & Balance Conditioning (GCS)",
        "experience": "15+ Years Clinical",
        "rating": "5.0 / 5.0 (385 Reviews)",
        "languages": "English",
        "hours": {
            "monWed": "8:00 AM – 3:30 PM",
            "thuFri": "9:30 AM – 5:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Geriatric Independence Philosophy",
        "bioParagraphs": [
            "Dr. Robert Hayes received his Doctorate in Physical Therapy from Boston University Sargent College, completing advanced clinical fellowships in geriatric trauma and neurological balance disorders. He is a Board-Certified Geriatric Clinical Specialist (GCS).",
            "Dr. Hayes believes that aging should never equal loss of vitality: \"Loss of balance and muscle weakness are not inevitable consequences of aging; they are reversible physical deconditionings. With progressive multi-sensory balance training and safe bone-density loading, our senior patients maintain full, vibrant independence.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "Boston University Sargent College",
                "desc": "Doctor of Physical Therapy (DPT), Geriatric Specialization"
            },
            {
                "icon": "fas fa-award",
                "color": "text-secondary",
                "title": "American Board of Physical Therapy",
                "desc": "Board-Certified Geriatric Clinical Specialist (GCS)"
            },
            {
                "icon": "fas fa-shield-alt",
                "color": "text-success",
                "title": "Matter of Balance National Institute",
                "desc": "Master Certified Fall Prevention Trainer"
            },
            {
                "icon": "fas fa-bone",
                "color": "text-info",
                "title": "National Osteoporosis Foundation",
                "desc": "Bone-Fit Certified Osteoporosis Exercise Specialist"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Robert Hayes",
        "bookingSubtitle": "Complete this form to reserve an evaluation block directly with Dr. Hayes.",
        "successMsg": "Evaluation request received for Dr. Hayes! We will call you within 15 minutes."
    },
    "almansoor": {
        "id": "almansoor",
        "name": "Dr. Hannah Al-Mansoor",
        "fullName": "Dr. Hannah Al-Mansoor, PT, DPT",
        "titleRole": "Director of Mobile Physical Therapy & Home Care Services",
        "sidebarRole": "Home Visit & Concierge Care Director",
        "image": "assets/images/therapist-almansoor.jpg",
        "heroImage": "assets/images/service-posture.jpg",
        "heroAlt": "Dr. Hannah Al-Mansoor in the Ergonomic Posture Assessment Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Home Care & Adaptive Living (PT, DPT)",
        "experience": "9+ Years Clinical",
        "rating": "4.9 / 5.0 (320 Reviews)",
        "languages": "English, Arabic",
        "hours": {
            "monWed": "8:00 AM – 5:00 PM",
            "thuFri": "8:00 AM – 5:00 PM",
            "sat": "Weekend Visits Available"
        },
        "bioTitle": "Biography & Home-Centered Rehabilitation Philosophy",
        "bioParagraphs": [
            "Dr. Hannah Al-Mansoor earned her Doctorate in Physical Therapy from the University of Michigan Ann Arbor. She spent five years in acute inpatient trauma rehabilitation before establishing PhysioLife's premier mobile concierge therapy division.",
            "Dr. Al-Mansoor specializes in home environmental ergonomics and post-discharge transitions: \"Treating patients in their personal living space bridges the gap between sterile clinic exercises and real-world functional navigation—stairs, kitchen transfer, and safe bathroom ergonomics.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "University of Michigan",
                "desc": "Doctor of Physical Therapy (DPT), Acute Rehabilitation Honors"
            },
            {
                "icon": "fas fa-home",
                "color": "text-secondary",
                "title": "Home Health Section APTA",
                "desc": "Certified Home Health Physical Therapy Specialist"
            },
            {
                "icon": "fas fa-chair",
                "color": "text-success",
                "title": "Executive Certificate in Home Modification",
                "desc": "USC Leonard Davis School of Gerontology"
            },
            {
                "icon": "fas fa-heartbeat",
                "color": "text-info",
                "title": "American Heart Association",
                "desc": "Advanced Cardiovascular Life Support (ACLS) Certified"
            }
        ],
        "bookingTitle": "Request Home Visit with Dr. Hannah Al-Mansoor",
        "bookingSubtitle": "Complete this form to reserve a private home visit session with Dr. Al-Mansoor.",
        "successMsg": "Home visit request received for Dr. Al-Mansoor! Our intake coordinator will contact you shortly."
    },
    "watson": {
        "id": "watson",
        "name": "Dr. Emily Watson",
        "fullName": "Dr. Emily Watson, PT, DPT, PCS",
        "titleRole": "Board-Certified Pediatric Clinical Specialist",
        "sidebarRole": "Pediatric Development & Torticollis Lead",
        "image": "assets/images/therapist-watson.jpg",
        "heroImage": "assets/images/service-postop-shoulder.jpg",
        "heroAlt": "Dr. Emily Watson in the Glenohumeral Joint Kinematics Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Pediatric Rehabilitation & Milestones (PCS)",
        "experience": "11+ Years Clinical",
        "rating": "5.0 / 5.0 (360 Reviews)",
        "languages": "English",
        "hours": {
            "monWed": "8:30 AM – 4:00 PM",
            "thuFri": "9:00 AM – 5:30 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Pediatric Developmental Philosophy",
        "bioParagraphs": [
            "Dr. Emily Watson received her Doctorate in Physical Therapy from the University of North Carolina at Chapel Hill, followed by a dedicated pediatric physical therapy residency at Children's Healthcare. She is a Board-Certified Pediatric Clinical Specialist (PCS).",
            "Dr. Watson creates a play-centered, low-stress clinical atmosphere for infants and children: \"Children learn and heal through purposeful play. Whether treating congenital torticollis, toe walking, or motor coordination delays, our goal is building confidence and joy in physical movement.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "UNC Chapel Hill",
                "desc": "Doctor of Physical Therapy (DPT), Pediatric Fellowship"
            },
            {
                "icon": "fas fa-child",
                "color": "text-secondary",
                "title": "American Board of Physical Therapy",
                "desc": "Board-Certified Pediatric Clinical Specialist (PCS)"
            },
            {
                "icon": "fas fa-baby",
                "color": "text-success",
                "title": "Academy of Pediatric Physical Therapy",
                "desc": "Infant Torticollis & Plagiocephaly Specialist"
            },
            {
                "icon": "fas fa-puzzle-piece",
                "color": "text-info",
                "title": "Neuro-Developmental Treatment Association",
                "desc": "C/NDT Certified Pediatric Practitioner"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Emily Watson",
        "bookingSubtitle": "Complete this form to reserve a pediatric evaluation with Dr. Watson.",
        "successMsg": "Evaluation request received for Dr. Watson! Our pediatric care coordinator will call you."
    },
    "brooks": {
        "id": "brooks",
        "name": "Dr. Tyler Brooks",
        "fullName": "Dr. Tyler Brooks, PT, DPT, ATRI-C",
        "titleRole": "Certified Aquatic & Hydrotherapy Rehabilitation Director",
        "sidebarRole": "Aquatic Rehabilitation & Hydrotherapy Lead",
        "image": "assets/images/therapist-brooks.jpg",
        "heroImage": "assets/images/service-aquatic.jpg",
        "heroAlt": "Dr. Tyler Brooks in the Heated Hydrotherapy Rehabilitation Pool Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Aquatic Physical Therapy (ATRI-C)",
        "experience": "8+ Years Clinical",
        "rating": "4.9 / 5.0 (245 Reviews)",
        "languages": "English",
        "hours": {
            "monWed": "7:30 AM – 3:30 PM",
            "thuFri": "10:00 AM – 6:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Hydrodynamic Therapy Philosophy",
        "bioParagraphs": [
            "Dr. Tyler Brooks completed his Doctorate in Physical Therapy at the University of Florida. He is internationally certified by the Aquatic Therapy & Rehab Institute (ATRI-C) with over eight years of clinical hydrotherapy experience in heated therapeutic pools.",
            "Dr. Brooks harnesses water dynamics to accelerate rehabilitation: \"Buoyancy eliminates up to 85% of gravitational joint load, allowing patients recovering from severe fractures, joint replacements, or acute neurological injuries to walk, run, and strengthen without pain or fear of impact.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "University of Florida",
                "desc": "Doctor of Physical Therapy (DPT), Exercise Physiology"
            },
            {
                "icon": "fas fa-water",
                "color": "text-secondary",
                "title": "Aquatic Therapy & Rehab Institute",
                "desc": "ATRI-C Certified Aquatic Therapist"
            },
            {
                "icon": "fas fa-swimmer",
                "color": "text-success",
                "title": "Bad Ragaz Ring Method Council",
                "desc": "Certified Aquatic Manual Therapist (BRRM)"
            },
            {
                "icon": "fas fa-life-ring",
                "color": "text-info",
                "title": "American Red Cross",
                "desc": "Lifeguard & Water Safety Instructor (WSI)"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Tyler Brooks",
        "bookingSubtitle": "Complete this form to reserve an aquatic evaluation block with Dr. Brooks.",
        "successMsg": "Aquatic session request received for Dr. Brooks! We will call you within 15 minutes."
    },
    "voronov": {
        "id": "voronov",
        "name": "Dr. Alexei Voronov",
        "fullName": "Dr. Alexei Voronov, PT, DPT, CBIS",
        "titleRole": "Stroke Recovery & Certified Brain Injury Specialist",
        "sidebarRole": "Stroke & Hemiparetic Neuro-Motor Lead",
        "image": "assets/images/therapist-voronov.jpg",
        "heroImage": "assets/images/service-stroke.jpg",
        "heroAlt": "Dr. Alexei Voronov in the Neuromuscular Task-Specific Relearning Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Stroke Recovery & Neurotrauma (CBIS)",
        "experience": "12+ Years Clinical",
        "rating": "5.0 / 5.0 (330 Reviews)",
        "languages": "English, Russian, Polish",
        "hours": {
            "monWed": "7:00 AM – 3:00 PM",
            "thuFri": "9:00 AM – 5:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Stroke Neuro-Motor Retraining Philosophy",
        "bioParagraphs": [
            "Dr. Alexei Voronov earned his Doctorate in Physical Therapy from the University of Washington School of Medicine. He completed fellowship training in stroke neurological recovery at the Rehabilitation Institute of Chicago and is a Certified Brain Injury Specialist (CBIS).",
            "Dr. Voronov specializes in motor learning and constraint-induced movement therapy (CIMT): \"Even months or years following a stroke, intensive high-repetition task practice with body-weight support treadmill training reactivates neural circuits and restores functional limb control.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "University of Washington",
                "desc": "Doctor of Physical Therapy (DPT), Neuro-Trauma Honors"
            },
            {
                "icon": "fas fa-brain",
                "color": "text-secondary",
                "title": "Brain Injury Association of America",
                "desc": "Certified Brain Injury Specialist (CBIS)"
            },
            {
                "icon": "fas fa-walking",
                "color": "text-success",
                "title": "LiteGait Clinical Academy",
                "desc": "Certified Body-Weight Supported Treadmill Trainer"
            },
            {
                "icon": "fas fa-bolt",
                "color": "text-info",
                "title": "Bioness Neuromuscular Institute",
                "desc": "Functional Electrical Stimulation (FES) Practitioner"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Alexei Voronov",
        "bookingSubtitle": "Complete this form to reserve a stroke recovery evaluation with Dr. Voronov.",
        "successMsg": "Evaluation request received for Dr. Voronov! We will call you within 15 minutes."
    },
    "laurent": {
        "id": "laurent",
        "name": "Dr. Sophie Laurent",
        "fullName": "Dr. Sophie Laurent, PT, DPT, VRT",
        "titleRole": "Vestibular Oculomotor & Balance Retraining Specialist",
        "sidebarRole": "Vestibular & Vertigo Rehabilitation Lead",
        "image": "assets/images/therapist-laurent.jpg",
        "heroImage": "assets/images/service-vestibular.jpg",
        "heroAlt": "Dr. Sophie Laurent in the Vestibular Ocular & Dynamic Balance Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Vestibular & BPPV (VRT Certification)",
        "experience": "10+ Years Clinical",
        "rating": "4.9 / 5.0 (290 Reviews)",
        "languages": "English, French",
        "hours": {
            "monWed": "8:00 AM – 4:00 PM",
            "thuFri": "10:00 AM – 6:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Vestibular Equilibrium Philosophy",
        "bioParagraphs": [
            "Dr. Sophie Laurent received her Doctorate in Physical Therapy from Northwestern University Feinberg School of Medicine. She completed advanced competency training in vestibular rehabilitation through Emory University and has treated thousands of patients suffering from debilitating vertigo and imbalance.",
            "Dr. Laurent focuses on inner ear mechanics and vestibulo-ocular reflex (VOR) stabilization: \"Vertigo and chronic dizziness should not be tolerated as a lifestyle limitation. With precision infrared nystagmus tracking and canalith repositioning maneuvers, 90% of BPPV cases resolve in just one to two sessions.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "Northwestern University",
                "desc": "Doctor of Physical Therapy (DPT), Vestibular Track"
            },
            {
                "icon": "fas fa-compass",
                "color": "text-secondary",
                "title": "Emory University School of Medicine",
                "desc": "Certificate of Vestibular Rehabilitation Competency (VRT)"
            },
            {
                "icon": "fas fa-eye",
                "color": "text-success",
                "title": "American Balance Institute",
                "desc": "Certified Video-Nystagmography Examiner"
            },
            {
                "icon": "fas fa-shield-virus",
                "color": "text-info",
                "title": "Vestibular Disorders Association (VeDA)",
                "desc": "Professional Clinical Affiliate Member"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Sophie Laurent",
        "bookingSubtitle": "Complete this form to reserve a vestibular evaluation with Dr. Laurent.",
        "successMsg": "Evaluation request received for Dr. Laurent! We will call you within 15 minutes."
    },
    "sterling": {
        "id": "sterling",
        "name": "Dr. James Sterling",
        "fullName": "Dr. James Sterling, PT, DPT, SCS, FAAOMPT",
        "titleRole": "Tendon Reconstruction & Orthopedic Surgical Fellow",
        "sidebarRole": "Tendon & Ligament Post-Surgical Lead",
        "image": "assets/images/therapist-sterling.jpg",
        "heroImage": "assets/images/service-postop-shoulder.jpg",
        "heroAlt": "Dr. James Sterling in the Shoulder Arthroscopy Recovery Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Tendon Reconstruction & Post-Op (FAAOMPT)",
        "experience": "13+ Years Clinical",
        "rating": "5.0 / 5.0 (345 Reviews)",
        "languages": "English",
        "hours": {
            "monWed": "7:30 AM – 3:30 PM",
            "thuFri": "11:00 AM – 7:00 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Surgical Tendon Regeneration Philosophy",
        "bioParagraphs": [
            "Dr. James Sterling completed his Doctorate in Physical Therapy at the University of Virginia, followed by an intensive Fellowship in Orthopaedic Manual Physical Therapy, granting him the prestigious Fellow of the American Academy of Orthopaedic Manual Physical Therapists (FAAOMPT) designation.",
            "Dr. Sterling specializes in protecting surgical anchors while stimulating tendon collagen synthesis: \"A repaired tendon requires an exact continuum of passive protection, gentle tensile elongation, and progressive eccentric loading. We respect the biologic timeline to prevent repair failure while rapidly restoring full functional mobility.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "University of Virginia",
                "desc": "Doctor of Physical Therapy (DPT), Orthopedic Fellow"
            },
            {
                "icon": "fas fa-award",
                "color": "text-secondary",
                "title": "AAOMPT Fellowship Academy",
                "desc": "Fellow of American Academy of Orthopaedic Manual PT (FAAOMPT)"
            },
            {
                "icon": "fas fa-band-aid",
                "color": "text-success",
                "title": "American Board of Physical Therapy",
                "desc": "Board-Certified Sports Clinical Specialist (SCS)"
            },
            {
                "icon": "fas fa-shield-alt",
                "color": "text-info",
                "title": "Orthopedic Trauma Association",
                "desc": "Complex Multi-Ligament Post-Surgical Specialist"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. James Sterling",
        "bookingSubtitle": "Complete this form to reserve an evaluation block with Dr. Sterling.",
        "successMsg": "Evaluation request received for Dr. Sterling! We will call you within 15 minutes."
    },
    "cross": {
        "id": "cross",
        "name": "Dr. Nathan Cross",
        "fullName": "Dr. Nathan Cross, PT, DPT, CSCS",
        "titleRole": "3D Running Kinematics & Endurance Biomechanics Specialist",
        "sidebarRole": "Runner's Injury & 3D Gait Lead",
        "image": "assets/images/therapist-cross.jpg",
        "heroImage": "assets/images/service-runners-gait.jpg",
        "heroAlt": "Dr. Nathan Cross in the 3D Running Cadence & Biomechanics Lab",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Running Biomechanics & Gait Retraining (CSCS)",
        "experience": "9+ Years Clinical",
        "rating": "4.9 / 5.0 (310 Reviews)",
        "languages": "English",
        "hours": {
            "monWed": "8:00 AM – 4:00 PM",
            "thuFri": "10:30 AM – 6:30 PM",
            "sat": "Saturday Morning Gait Clinic"
        },
        "bioTitle": "Biography & Kinetic Gait Retraining Philosophy",
        "bioParagraphs": [
            "Dr. Nathan Cross received his Doctorate in Physical Therapy from the University of Colorado Boulder, a premier hub for endurance sports medicine. As a competitive marathoner and certified running coach, he directs PhysioLife's state-of-the-art 3D Video Running Gait Analysis Laboratory.",
            "Dr. Cross specializes in resolving chronic running injuries without enforcing complete rest: \"Telling a runner to simply stop running fails to fix the root mechanical dysfunction. Through high-speed digital motion tracking, cadence modification, and targeted kinetic chain loading, we correct braking forces so runners heal while sustaining mileage.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "University of Colorado Boulder",
                "desc": "Doctor of Physical Therapy (DPT), Biomechanics Lab"
            },
            {
                "icon": "fas fa-running",
                "color": "text-secondary",
                "title": "National Strength & Conditioning Association",
                "desc": "Certified Strength & Conditioning Specialist (CSCS)"
            },
            {
                "icon": "fas fa-video",
                "color": "text-success",
                "title": "The Running Clinic International",
                "desc": "Certified Running Injury Specialist (Y-Balance)"
            },
            {
                "icon": "fas fa-shoe-prints",
                "color": "text-info",
                "title": "USATF Track & Field Level 2",
                "desc": "Certified Endurance Running Gait Coach"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Nathan Cross",
        "bookingSubtitle": "Complete this form to reserve a 3D gait evaluation with Dr. Cross.",
        "successMsg": "Evaluation request received for Dr. Cross! We will call you within 15 minutes."
    },
    "patel": {
        "id": "patel",
        "name": "Dr. Maya Patel",
        "fullName": "Dr. Maya Patel, PT, DPT, CEAS",
        "titleRole": "Ergonomic Assessment Specialist & Spinal Biomechanics Lead",
        "sidebarRole": "Posture Correction & Workplace Ergonomics Lead",
        "image": "assets/images/therapist-patel.jpg",
        "heroImage": "assets/images/service-posture.jpg",
        "heroAlt": "Dr. Maya Patel in the Ergonomic Workstation Optimization Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Ergonomics & Postural Correction (CEAS)",
        "experience": "9+ Years Clinical",
        "rating": "4.9 / 5.0 (265 Reviews)",
        "languages": "English, Hindi",
        "hours": {
            "monWed": "8:30 AM – 4:30 PM",
            "thuFri": "9:30 AM – 5:30 PM",
            "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Ergonomic Realignment Philosophy",
        "bioParagraphs": [
            "Dr. Maya Patel earned her Doctorate in Physical Therapy from Georgetown University. She is a Certified Ergonomic Assessment Specialist (CEAS) and has consulted for major technology firms to design injury-preventative office workstations.",
            "Dr. Patel specializes in treating tech neck, anterior pelvic tilt, and scapular dyskinesis: \"Postural pain is not cured by forced rigid sitting. True alignment requires releasing chronically shortened hip flexors and suboccipitals while building automatic, reflexive deep neck and core postural endurance.\""
        ],
        "credentials": [
            {
                "icon": "fas fa-graduation-cap",
                "color": "text-primary",
                "title": "Georgetown University",
                "desc": "Doctor of Physical Therapy (DPT), Orthopedic Honors"
            },
            {
                "icon": "fas fa-laptop",
                "color": "text-secondary",
                "title": "The Ergonomics Center of North Carolina",
                "desc": "Certified Ergonomic Assessment Specialist (CEAS III)"
            },
            {
                "icon": "fas fa-align-center",
                "color": "text-success",
                "title": "Kendall Postural Assessment Academy",
                "desc": "Advanced Postural & Musculoskeletal Screening"
            },
            {
                "icon": "fas fa-chair",
                "color": "text-info",
                "title": "Ergonomics Institute of America",
                "desc": "Workplace Injury Prevention Consultant"
            }
        ],
        "bookingTitle": "Request Appointment with Dr. Maya Patel",
        "bookingSubtitle": "Complete this form to reserve an ergonomic evaluation with Dr. Patel.",
        "successMsg": "Evaluation request received for Dr. Patel! We will call you within 15 minutes."
    },
    "kowalski": {
        "id": "kowalski",
        "name": "Dr. Daniel Kowalski",
        "fullName": "Dr. Daniel Kowalski, PT, DPT, FAAOMPT",
        "titleRole": "Cervical Spine Fellow & Non-Surgical Decompression Specialist",
        "sidebarRole": "Cervical Spine & Decompression Lead",
        "image": "assets/images/therapist-kowalski.jpg",
        "heroImage": "assets/images/service-spine.jpg",
        "heroAlt": "Dr. Daniel Kowalski in the Cervical Spine & Decompression Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Cervical Radiculopathy & Traction (FAAOMPT)",
        "experience": "11+ Years Clinical",
        "rating": "4.9 / 5.0 (312 Reviews)",
        "languages": "English, Polish",
        "hours": {
                "monWed": "8:00 AM – 4:00 PM",
                "thuFri": "10:00 AM – 6:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Non-Surgical Decompression Philosophy",
        "bioParagraphs": [
                "Dr. Daniel Kowalski completed his Doctorate in Physical Therapy at Northwestern University Feinberg School of Medicine, followed by an advanced Fellowship in Orthopaedic Manual Physical Therapy (FAAOMPT) dedicated to cervical spine kinematics and disc decompression.",
                "Dr. Kowalski believes in non-surgical precision recovery: \"By relieving mechanical pressure on the cervical nerve roots through graded intermittent distraction and retraining craniocervical deep flexors, we successfully alleviate radiating pain without resorting to spinal surgery.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "Northwestern University",
                        "desc": "Doctor of Physical Therapy (DPT), Highest Honors"
                },
                {
                        "icon": "fas fa-certificate",
                        "color": "text-secondary",
                        "title": "American Academy of Orthopaedic Manual PT",
                        "desc": "Fellow (FAAOMPT) Cervical Spine Specialization"
                },
                {
                        "icon": "fas fa-compress-arrows-alt",
                        "color": "text-success",
                        "title": "North American Spine Society",
                        "desc": "Certified Spinal Decompression Therapy Lead"
                },
                {
                        "icon": "fas fa-shield-alt",
                        "color": "text-info",
                        "title": "McKenzie Institute USA",
                        "desc": "Mechanical Diagnosis and Therapy Certified (Cert. MDT)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Daniel Kowalski",
        "bookingSubtitle": "Complete this form to reserve a cervical spine evaluation block directly with Dr. Kowalski.",
        "successMsg": "Evaluation request received for Dr. Kowalski! We will call you within 15 minutes."
},
    "oconnor": {
        "id": "oconnor",
        "name": "Dr. Patrick O'Connor",
        "fullName": "Dr. Patrick O'Connor, PT, DPT, SCS, CSCS",
        "titleRole": "Overhead Athlete Kinetic Chain & Rotational Power Specialist",
        "sidebarRole": "Thrower's Shoulder & Scapular Lead",
        "image": "assets/images/therapist-oconnor.jpg",
        "heroImage": "assets/images/service-sports.jpg",
        "heroAlt": "Dr. Patrick O'Connor in the Overhead Athlete Kinetic Chain Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Thrower's Shoulder & Scapular Dyskinesis (SCS)",
        "experience": "9+ Years Clinical",
        "rating": "4.9 / 5.0 (278 Reviews)",
        "languages": "English",
        "hours": {
                "monWed": "7:30 AM – 3:30 PM",
                "thuFri": "11:00 AM – 7:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Overhead Athlete Rehabilitation Philosophy",
        "bioParagraphs": [
                "Dr. Patrick O'Connor earned his Doctorate in Physical Therapy from the University of Florida and completed a Sports Physical Therapy Residency specializing in overhead throwing kinematics and scapular force couples.",
                "Dr. O'Connor emphasizes full kinetic chain energy transfer: \"Shoulder health in throwers begins at the hips and thoracic spine; restoring kinetic sequencing eliminates excessive anterior glenohumeral shear stress.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "University of Florida",
                        "desc": "Doctor of Physical Therapy (DPT), Sports Track"
                },
                {
                        "icon": "fas fa-award",
                        "color": "text-secondary",
                        "title": "American Board of Physical Therapy",
                        "desc": "Board-Certified Sports Clinical Specialist (SCS)"
                },
                {
                        "icon": "fas fa-dumbbell",
                        "color": "text-success",
                        "title": "National Strength & Conditioning Association",
                        "desc": "Certified Strength and Conditioning Specialist (CSCS)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Patrick O'Connor",
        "bookingSubtitle": "Complete this form to reserve a thrower's shoulder evaluation with Dr. O'Connor.",
        "successMsg": "Evaluation request received for Dr. O'Connor! We will call you within 15 minutes."
},
    "morales": {
        "id": "morales",
        "name": "Dr. Jessica Morales",
        "fullName": "Dr. Jessica Morales, PT, DPT, PRC",
        "titleRole": "Postural Restoration & Occupational Health Consultant",
        "sidebarRole": "Postural Restoration & Tech Neck Lead",
        "image": "assets/images/therapist-morales.jpg",
        "heroImage": "assets/images/service-posture.jpg",
        "heroAlt": "Dr. Jessica Morales in the 3D Postural Restoration & Breathing Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Postural Restoration (PRC) & Cervical Biomechanics",
        "experience": "8+ Years Clinical",
        "rating": "4.9 / 5.0 (265 Reviews)",
        "languages": "English, Spanish",
        "hours": {
                "monWed": "8:30 AM – 4:30 PM",
                "thuFri": "10:00 AM – 6:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Postural Alignment Philosophy",
        "bioParagraphs": [
                "Dr. Jessica Morales graduated with honors from the University of Miami Division of Physical Therapy. She is a certified Postural Restoration Certified (PRC) clinician who specializes in resolving forward head posture, tech neck, and ribcage rotational asymmetries.",
                "Dr. Morales works with modern professionals: \"Correcting tech neck isn't just pulling your chin back; it requires restoring thoracic kyphosis dynamics and diaphragmatic breathing patterns.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "University of Miami",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-certificate",
                        "color": "text-secondary",
                        "title": "Postural Restoration Institute",
                        "desc": "Postural Restoration Certified (PRC)"
                },
                {
                        "icon": "fas fa-desktop",
                        "color": "text-success",
                        "title": "Ergonomics Institute of America",
                        "desc": "Certified Workstation Evaluator"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Jessica Morales",
        "bookingSubtitle": "Reserve a postural consultation session directly with Dr. Morales.",
        "successMsg": "Evaluation request received for Dr. Morales! We will call you within 15 minutes."
},
    "scott": {
        "id": "scott",
        "name": "Dr. Benjamin Scott",
        "fullName": "Dr. Benjamin Scott, PT, DPT, OCS",
        "titleRole": "Spinal Alignment & Biomechanical Correction Specialist",
        "sidebarRole": "Lumbar Lordosis & Pelvic Tilt Lead",
        "image": "assets/images/therapist-scott.jpg",
        "heroImage": "assets/images/service-spine.jpg",
        "heroAlt": "Dr. Benjamin Scott in the Sagittal Spine Alignment Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Sagittal Pelvic Alignment & Spine Biomechanics (OCS)",
        "experience": "10+ Years Clinical",
        "rating": "4.9 / 5.0 (290 Reviews)",
        "languages": "English",
        "hours": {
                "monWed": "8:00 AM – 4:00 PM",
                "thuFri": "11:00 AM – 7:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Sagittal Alignment Philosophy",
        "bioParagraphs": [
                "Dr. Benjamin Scott received his DPT from Duke University School of Medicine. With advanced board certification in Orthopedics (OCS), Dr. Scott specializes in complex pelvic-lumbar force-couple imbalances and anterior pelvic tilt corrections.",
                "\"When hip flexors overpower anterior abdominal muscles, the lumbar spine absorbs excessive shear. Balancing these force couples restores pain-free functional posture.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "Duke University",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-certificate",
                        "color": "text-secondary",
                        "title": "American Board of Physical Therapy Specialties",
                        "desc": "Board-Certified Orthopedic Clinical Specialist (OCS)"
                },
                {
                        "icon": "fas fa-bone",
                        "color": "text-success",
                        "title": "North American Institute of Orthopaedic Manual PT",
                        "desc": "Level III Advanced Manual Practitioner"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Benjamin Scott",
        "bookingSubtitle": "Schedule an evaluation for pelvic tilt and lumbar spine alignment with Dr. Scott.",
        "successMsg": "Evaluation request received for Dr. Scott! We will call you within 15 minutes."
},
    "henderson": {
        "id": "henderson",
        "name": "Dr. Ryan Henderson",
        "fullName": "Dr. Ryan Henderson, PT, DPT, Dip. MDT",
        "titleRole": "Certified Mechanical Diagnosis & Therapy (Cert. MDT) Specialist",
        "sidebarRole": "McKenzie Lumbar Disc Protocol Lead",
        "image": "assets/images/therapist-henderson.jpg",
        "heroImage": "assets/images/service-spine.jpg",
        "heroAlt": "Dr. Ryan Henderson in the Mechanical Diagnosis & Disc Centralization Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "McKenzie Method & Acute Disc Bulges (Dip. MDT)",
        "experience": "12+ Years Clinical",
        "rating": "5.0 / 5.0 (310 Reviews)",
        "languages": "English",
        "hours": {
                "monWed": "7:00 AM – 3:00 PM",
                "thuFri": "10:00 AM – 6:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Mechanical Spine Therapy",
        "bioParagraphs": [
                "Dr. Ryan Henderson holds the prestigious International Diploma in Mechanical Diagnosis and Therapy from The McKenzie Institute. He is one of the region's foremost authorities on rapid directional preference and disc centralisation.",
                "\"Most disc bulges possess a mechanical directional preference. Once identified, repetitive extension drills allow patients to rapidly self-manage and abolish radiating pain.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "University of Pittsburgh",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-certificate",
                        "color": "text-secondary",
                        "title": "The McKenzie Institute International",
                        "desc": "Diplomate in Mechanical Diagnosis and Therapy (Dip. MDT)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Ryan Henderson",
        "bookingSubtitle": "Reserve a McKenzie disc assessment session with Dr. Henderson.",
        "successMsg": "Evaluation request received for Dr. Henderson! We will call you within 15 minutes."
},
    "zimmerman": {
        "id": "zimmerman",
        "name": "Dr. Rachel Zimmerman",
        "fullName": "Dr. Rachel Zimmerman, PT, DPT, CHT",
        "titleRole": "Upper Extremity Manual Therapist & Ergonomics Consultant",
        "sidebarRole": "Carpal Tunnel & RSI Clinical Lead",
        "image": "assets/images/therapist-zimmerman.jpg",
        "heroImage": "assets/images/service-posture.jpg",
        "heroAlt": "Dr. Rachel Zimmerman in the Hand & Upper Extremity Ergonomics Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Certified Hand Therapist (CHT) & Ergonomics",
        "experience": "11+ Years Clinical",
        "rating": "4.9 / 5.0 (284 Reviews)",
        "languages": "English, German",
        "hours": {
                "monWed": "8:00 AM – 4:00 PM",
                "thuFri": "10:00 AM – 6:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Upper Extremity Ergonomics",
        "bioParagraphs": [
                "Dr. Rachel Zimmerman is a dual-credentialed Doctor of Physical Therapy and Certified Hand Therapist (CHT). She specializes in repetitive strain injury (RSI), median nerve entrapment, and workstation micro-adjustments.",
                "\"Nerves require free longitudinal gliding and arterial blood flow. Targeted tendon and nerve flossing prevent fibrotic compression in modern keyboard workers.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "Boston University",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-hand-holding-medical",
                        "color": "text-secondary",
                        "title": "Hand Therapy Certification Commission",
                        "desc": "Certified Hand Therapist (CHT)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Rachel Zimmerman",
        "bookingSubtitle": "Schedule a hand and wrist rehabilitation session with Dr. Zimmerman.",
        "successMsg": "Evaluation request received for Dr. Zimmerman! We will call you within 15 minutes."
},
    "mitchell": {
        "id": "mitchell",
        "name": "Dr. Aaron Mitchell",
        "fullName": "Dr. Aaron Mitchell, PT, DPT, CSCS",
        "titleRole": "Foot & Ankle Biomechanics & Shockwave Specialist",
        "sidebarRole": "Plantar Fasciitis & Foot Biomechanics Lead",
        "image": "assets/images/therapist-mitchell.jpg",
        "heroImage": "assets/images/service-runners-gait.jpg",
        "heroAlt": "Dr. Aaron Mitchell in the Extracorporeal Shockwave & Foot Biomechanics Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Plantar Fascia Shockwave & Gait Analysis",
        "experience": "7+ Years Clinical",
        "rating": "4.8 / 5.0 (245 Reviews)",
        "languages": "English",
        "hours": {
                "monWed": "7:30 AM – 3:30 PM",
                "thuFri": "11:00 AM – 7:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Lower Extremity Kinetics",
        "bioParagraphs": [
                "Dr. Aaron Mitchell earned his DPT from the University of Washington. He combines high-energy extracorporeal shockwave therapy (ESWT) with high-load strength training for chronic heel pain and plantar fasciitis.",
                "\"The plantar fascia is collagen that requires progressive tensile stimulation rather than passive rest to stimulate cellular matrix regeneration.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "University of Washington",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-wave-square",
                        "color": "text-secondary",
                        "title": "International Society for Medical Shockwave Treatment",
                        "desc": "Certified Radial & Focused Shockwave Specialist"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Aaron Mitchell",
        "bookingSubtitle": "Reserve a plantar fasciitis evaluation block with Dr. Mitchell.",
        "successMsg": "Evaluation request received for Dr. Mitchell! We will call you within 15 minutes."
},
    "taylor": {
        "id": "taylor",
        "name": "Dr. Olivia Taylor",
        "fullName": "Dr. Olivia Taylor, PT, DPT, SCS",
        "titleRole": "Acute Sports Trauma & Ligament Healing Specialist",
        "sidebarRole": "Ankle Sprain & POLICE Protocol Lead",
        "image": "assets/images/therapist-taylor.jpg",
        "heroImage": "assets/images/service-sports.jpg",
        "heroAlt": "Dr. Olivia Taylor in the Acute Sports Trauma & Ligament Healing Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Acute Ligament Trauma & POLICE Protocols (SCS)",
        "experience": "8+ Years Clinical",
        "rating": "4.9 / 5.0 (260 Reviews)",
        "languages": "English",
        "hours": {
                "monWed": "8:00 AM – 4:00 PM",
                "thuFri": "10:00 AM – 6:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Sports Ligament Rehabilitation",
        "bioParagraphs": [
                "Dr. Olivia Taylor received her Doctorate from King's College London and completed advanced Sports Specialty certification in the US. She champions the modern POLICE protocol over outdated RICE methods.",
                "\"Optimal loading during the acute proliferative phase of ligament repair prevents chronic ankle instability and accelerates safe return to athletic play.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "King's College London",
                        "desc": "Doctor of Physical Therapy (Honours)"
                },
                {
                        "icon": "fas fa-medal",
                        "color": "text-secondary",
                        "title": "American Board of Physical Therapy",
                        "desc": "Board-Certified Sports Clinical Specialist (SCS)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Olivia Taylor",
        "bookingSubtitle": "Schedule an acute ankle ligament assessment with Dr. Taylor.",
        "successMsg": "Evaluation request received for Dr. Taylor! We will call you within 15 minutes."
},
    "moreau": {
        "id": "moreau",
        "name": "Dr. Lucas Moreau",
        "fullName": "Dr. Lucas Moreau, PT, DPT, CMPT",
        "titleRole": "Tendinopathy Rehabilitation & Manual Therapy Specialist",
        "sidebarRole": "Tennis Elbow & Tendon Loading Lead",
        "image": "assets/images/therapist-moreau.jpg",
        "heroImage": "assets/images/service-mobility.jpg",
        "heroAlt": "Dr. Lucas Moreau in the Eccentric Tendinopathy Remodeling Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Eccentric Tendinopathy & Wrist Extensors (CMPT)",
        "experience": "10+ Years Clinical",
        "rating": "4.9 / 5.0 (275 Reviews)",
        "languages": "English, French",
        "hours": {
                "monWed": "7:30 AM – 3:30 PM",
                "thuFri": "11:00 AM – 7:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Tendinopathy Regeneration",
        "bioParagraphs": [
                "Dr. Lucas Moreau completed his physical therapy doctorate at the University of Montreal followed by advanced certification in orthopedic manual physical therapy (CMPT).",
                "\"Tendon healing is a load-driven biological process. Through heavy-slow resistance training, we trigger collagen tendon remodeling for stubborn lateral epicondylalgia.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "University of Montreal",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-certificate",
                        "color": "text-secondary",
                        "title": "North American Institute of Orthopaedic Manual PT",
                        "desc": "Certified Manual Physical Therapist (CMPT)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Lucas Moreau",
        "bookingSubtitle": "Reserve a tendinopathy consultation with Dr. Moreau.",
        "successMsg": "Evaluation request received for Dr. Moreau! We will call you within 15 minutes."
},
    "dupont": {
        "id": "dupont",
        "name": "Dr. Claire Dupont",
        "fullName": "Dr. Claire Dupont, PT, DPT, OCS",
        "titleRole": "Hip Arthroscopy & Joint Kinematics Specialist",
        "sidebarRole": "Femoroacetabular Impingement (FAI) Lead",
        "image": "assets/images/therapist-dupont.jpg",
        "heroImage": "assets/images/service-joint.jpg",
        "heroAlt": "Dr. Claire Dupont in the Hip Arthroscopy & Joint Kinematics Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Hip Labral & FAI Joint Kinematics (OCS)",
        "experience": "9+ Years Clinical",
        "rating": "4.9 / 5.0 (270 Reviews)",
        "languages": "English, French",
        "hours": {
                "monWed": "8:00 AM – 4:00 PM",
                "thuFri": "10:00 AM – 6:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Hip Preservation Philosophy",
        "bioParagraphs": [
                "Dr. Claire Dupont earned her Doctorate from Emory University School of Medicine and completed an orthopedic fellowship with an emphasis on hip preservation and labral kinematics.",
                "\"Improving deep hip rotators and correcting pelvic tilt relieves impingement at the femoral-acetabular junction, allowing athletes to squat and lunge without anterior pinch.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "Emory University",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-award",
                        "color": "text-secondary",
                        "title": "American Board of Physical Therapy Specialties",
                        "desc": "Board-Certified Orthopedic Clinical Specialist (OCS)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Claire Dupont",
        "bookingSubtitle": "Schedule an FAI hip evaluation with Dr. Dupont.",
        "successMsg": "Evaluation request received for Dr. Dupont! We will call you within 15 minutes."
},
    "fisher": {
        "id": "fisher",
        "name": "Dr. Natalie Fisher",
        "fullName": "Dr. Natalie Fisher, PT, DPT, GCS",
        "titleRole": "Post-Arthroplasty Rehabilitation Clinical Fellow",
        "sidebarRole": "Total Knee Replacement Roadmap Lead",
        "image": "assets/images/therapist-fisher.jpg",
        "heroImage": "assets/images/service-postop.jpg",
        "heroAlt": "Dr. Natalie Fisher in the Total Joint Arthroplasty Rehabilitation Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Total Knee Arthroplasty 12-Week Milestones",
        "experience": "14+ Years Clinical",
        "rating": "5.0 / 5.0 (360 Reviews)",
        "languages": "English",
        "hours": {
                "monWed": "7:00 AM – 3:00 PM",
                "thuFri": "9:00 AM – 5:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Arthroplasty Roadmap",
        "bioParagraphs": [
                "Dr. Natalie Fisher is a Senior Clinical Fellow with over 14 years specializing exclusively in joint replacement recovery. She trained at the Hospital for Special Surgery in New York.",
                "\"Early extension and progressive closed kinetic chain loading guarantee long-term implant longevity and natural functional gait.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "New York University",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-certificate",
                        "color": "text-secondary",
                        "title": "American Board of Physical Therapy",
                        "desc": "Board-Certified Geriatric Clinical Specialist (GCS)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Natalie Fisher",
        "bookingSubtitle": "Reserve a joint replacement rehabilitation consult with Dr. Fisher.",
        "successMsg": "Evaluation request received for Dr. Fisher! We will call you within 15 minutes."
},
    "malhotra": {
        "id": "malhotra",
        "name": "Dr. Vikram Malhotra",
        "fullName": "Dr. Vikram Malhotra, PT, DPT, SCS, FAAOMPT",
        "titleRole": "Post-Surgical Shoulder Fellow & Tissue Biomechanics Specialist",
        "sidebarRole": "Rotator Cuff Repair Arthroscopy Lead",
        "image": "assets/images/therapist-malhotra.jpg",
        "heroImage": "assets/images/service-postop-shoulder.jpg",
        "heroAlt": "Dr. Vikram Malhotra in the Post-Surgical Arthroscopic Shoulder Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Post-Op Arthroscopic Cuff Protection & Loading",
        "experience": "9+ Years Clinical",
        "rating": "4.9 / 5.0 (280 Reviews)",
        "languages": "English, Hindi",
        "hours": {
                "monWed": "8:00 AM – 4:00 PM",
                "thuFri": "10:00 AM – 6:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Post-Surgical Cuff Protection",
        "bioParagraphs": [
                "Dr. Vikram Malhotra completed his DPT at Northwestern University and an Orthopaedic Manual Physical Therapy Fellowship. He works collaboratively with top orthopedic shoulder surgeons.",
                "\"Protecting the suture anchor while promoting tendon-to-bone collagen maturation requires respect for biological healing phases without letting the capsule tighten.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "Northwestern University",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-shield-alt",
                        "color": "text-secondary",
                        "title": "American Academy of Orthopaedic Manual PT",
                        "desc": "Fellow (FAAOMPT)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Vikram Malhotra",
        "bookingSubtitle": "Schedule a rotator cuff repair post-surgical evaluation with Dr. Malhotra.",
        "successMsg": "Evaluation request received for Dr. Malhotra! We will call you within 15 minutes."
},
    "thorne": {
        "id": "thorne",
        "name": "Dr. Kevin Thorne",
        "fullName": "Dr. Kevin Thorne, PT, DPT, CSCS",
        "titleRole": "High-Velocity Sprint Mechanics & Hamstring Specialist",
        "sidebarRole": "Sprint Biomechanics & Nordic Eccentric Lead",
        "image": "assets/images/therapist-thorne.jpg",
        "heroImage": "assets/images/service-sports.jpg",
        "heroAlt": "Dr. Kevin Thorne in the High-Velocity Sprint Mechanics & Nordic Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Biceps Femoris Strain & Return-to-Sprint",
        "experience": "8+ Years Clinical",
        "rating": "4.9 / 5.0 (250 Reviews)",
        "languages": "English",
        "hours": {
                "monWed": "7:00 AM – 3:00 PM",
                "thuFri": "11:00 AM – 7:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Sprint Acceleration Mechanics",
        "bioParagraphs": [
                "Dr. Kevin Thorne earned his DPT at Ohio State University and trains collegiate sprinters and field athletes recovering from acute hamstring strains.",
                "\"Hamstrings tear during terminal swing eccentric deceleration. High-load eccentric training at long muscle lengths is the cornerstone of reinjury prevention.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "The Ohio State University",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-running",
                        "color": "text-secondary",
                        "title": "National Strength & Conditioning Association",
                        "desc": "CSCS Certified"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Kevin Thorne",
        "bookingSubtitle": "Reserve a sprint kinematics assessment with Dr. Thorne.",
        "successMsg": "Evaluation request received for Dr. Thorne! We will call you within 15 minutes."
},
    "gomez": {
        "id": "gomez",
        "name": "Dr. Andrea Gomez",
        "fullName": "Dr. Andrea Gomez, PT, DPT, CMPT",
        "titleRole": "Rotational Biomechanics & Spinal Mobilization Specialist",
        "sidebarRole": "Thoracic Spine Extension & Rib Mobility Lead",
        "image": "assets/images/therapist-gomez.jpg",
        "heroImage": "assets/images/service-mobility.jpg",
        "heroAlt": "Dr. Andrea Gomez in the Rotational Spinal Freedom & Thoracic Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Thoracic Cage Kinematics & Costovertebral Joints",
        "experience": "7+ Years Clinical",
        "rating": "4.8 / 5.0 (230 Reviews)",
        "languages": "English, Spanish",
        "hours": {
                "monWed": "8:30 AM – 4:30 PM",
                "thuFri": "10:30 AM – 6:30 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Rotational Spinal Freedom",
        "bioParagraphs": [
                "Dr. Andrea Gomez completed her physical therapy training at Texas Woman's University. She specializes in freeing hypomobile thoracic motion segments for golf, tennis, and rotational athletes.",
                "\"Thoracic stiffness forces the lumbar spine and shoulders to compensate. Restoring T-spine rotation unleashes athletic power and cures chronic neck fatigue.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "Texas Woman's University",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-certificate",
                        "color": "text-secondary",
                        "title": "North American Institute of Orthopaedic Manual PT",
                        "desc": "Certified Manual Physical Therapist (CMPT)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Andrea Gomez",
        "bookingSubtitle": "Schedule a thoracic mobility evaluation with Dr. Gomez.",
        "successMsg": "Evaluation request received for Dr. Gomez! We will call you within 15 minutes."
},
    "serena-vance": {
        "id": "serena-vance",
        "name": "Dr. Serena Vance",
        "fullName": "Dr. Serena Vance, PT, DPT, WCS, PRPC",
        "titleRole": "Pelvic Floor Rehabilitation & Deep Core Motor Control Specialist",
        "sidebarRole": "Deep Core & Pelvic Diaphragm Lead",
        "image": "assets/images/therapist-serena.jpg",
        "heroImage": "assets/images/service-chronic.jpg",
        "heroAlt": "Dr. Serena Vance in the Private Pelvic Health & Deep Core Motor Control Suite",
        "degree": "Doctor of Physical Therapy",
        "specialty": "Transverse Abdominis & Pelvic Floor Synchronization",
        "experience": "9+ Years Clinical",
        "rating": "5.0 / 5.0 (295 Reviews)",
        "languages": "English",
        "hours": {
                "monWed": "8:00 AM – 4:00 PM",
                "thuFri": "10:00 AM – 6:00 PM",
                "sat": "By Appointment Only"
        },
        "bioTitle": "Biography & Deep Core Stabilization",
        "bioParagraphs": [
                "Dr. Serena Vance earned her Doctorate from Washington University in St. Louis. She holds dual board certifications in Women's Clinical Health (WCS) and Pelvic Rehabilitation (PRPC).",
                "\"The core is a pressurized canister formed by the diaphragm, transverse abdominis, multifidus, and pelvic floor. True spinal stability comes from their fluid synchronization.\""
        ],
        "credentials": [
                {
                        "icon": "fas fa-graduation-cap",
                        "color": "text-primary",
                        "title": "Washington University in St. Louis",
                        "desc": "Doctor of Physical Therapy (DPT)"
                },
                {
                        "icon": "fas fa-award",
                        "color": "text-secondary",
                        "title": "American Board of Physical Therapy Specialties",
                        "desc": "Board-Certified Women's Clinical Specialist (WCS)"
                },
                {
                        "icon": "fas fa-certificate",
                        "color": "text-success",
                        "title": "Herman & Wallace Pelvic Rehabilitation Institute",
                        "desc": "Pelvic Rehabilitation Practitioner Certified (PRPC)"
                }
        ],
        "bookingTitle": "Request Appointment with Dr. Serena Vance",
        "bookingSubtitle": "Reserve a private deep core and pelvic health consultation with Dr. Vance.",
        "successMsg": "Evaluation request received for Dr. Vance! We will call you within 15 minutes."
}
};

  // =========================================================================
  // 2. Query Parameter Parser & Doctor Resolver
  // =========================================================================
  function getRequestedTherapistId() {
    let raw = '';
    try {
      const params = new URLSearchParams(window.location.search);
      raw = (params.get('id') || params.get('doctor') || params.get('therapist') || '').toLowerCase().trim();
      if (!raw && window.location.hash) {
        raw = window.location.hash.replace('#', '').toLowerCase().trim();
      }
    } catch (e) {
      console.warn('Error reading URL parameters:', e);
    }

    if (!raw) return 'jenkins';

    // Direct match in centralized database
    if (THERAPISTS_DATA[raw]) return raw;

    // Normalize: strip prefixes like 'dr-', 'dr.', 'dr_'
    const cleanSlug = raw.replace(/^dr[-_.\s]*/i, '').replace(/[^a-z0-9\-]/g, '');
    if (cleanSlug && THERAPISTS_DATA[cleanSlug]) return cleanSlug;

    // Aliases map
    const aliasMap = {
      'sarah': 'jenkins',
      'sarah-jenkins': 'jenkins',
      'marcus': 'vance',
      'marcus-vance': 'vance',
      'elena': 'rostova',
      'elena-rostova': 'rostova',
      'david': 'chen',
      'david-chen': 'chen',
      'chloe': 'bennett',
      'chloe-bennett': 'bennett',
      'julian': 'reed',
      'julian-reed': 'reed',
      'liam': 'gallagher',
      'liam-gallagher': 'gallagher',
      'robert': 'hayes',
      'robert-hayes': 'hayes',
      'hannah': 'almansoor',
      'hannah-almansoor': 'almansoor',
      'emily': 'watson',
      'emily-watson': 'watson',
      'tyler': 'brooks',
      'tyler-brooks': 'brooks',
      'alexei': 'voronov',
      'alexei-voronov': 'voronov',
      'sophie': 'laurent',
      'sophie-laurent': 'laurent',
      'james': 'sterling',
      'james-sterling': 'sterling',
      'nathan': 'cross',
      'nathan-cross': 'cross',
      'maya': 'patel',
      'maya-patel': 'patel',
      'kowalski': 'kowalski',
      'daniel-kowalski': 'kowalski',
      'daniel': 'kowalski',
      'oconnor': 'oconnor',
      'patrick-oconnor': 'oconnor',
      'patrick': 'oconnor',
      'morales': 'morales',
      'jessica-morales': 'morales',
      'jessica': 'morales',
      'scott': 'scott',
      'benjamin-scott': 'scott',
      'benjamin': 'scott',
      'henderson': 'henderson',
      'ryan-henderson': 'henderson',
      'ryan': 'henderson',
      'zimmerman': 'zimmerman',
      'rachel-zimmerman': 'zimmerman',
      'rachel': 'zimmerman',
      'mitchell': 'mitchell',
      'aaron-mitchell': 'mitchell',
      'aaron': 'mitchell',
      'taylor': 'taylor',
      'olivia-taylor': 'taylor',
      'olivia': 'taylor',
      'moreau': 'moreau',
      'lucas-moreau': 'moreau',
      'lucas': 'moreau',
      'dupont': 'dupont',
      'claire-dupont': 'dupont',
      'claire': 'dupont',
      'fisher': 'fisher',
      'natalie-fisher': 'fisher',
      'natalie': 'fisher',
      'malhotra': 'malhotra',
      'vikram-malhotra': 'malhotra',
      'vikram': 'malhotra',
      'thorne': 'thorne',
      'kevin-thorne': 'thorne',
      'kevin': 'thorne',
      'gomez': 'gomez',
      'andrea-gomez': 'gomez',
      'andrea': 'gomez',
      'serena': 'serena-vance',
      'serena-vance': 'serena-vance'
    };

    if (aliasMap[raw]) return aliasMap[raw];
    if (cleanSlug && aliasMap[cleanSlug]) return aliasMap[cleanSlug];

    // Check localStorage admin therapists dataset
    try {
      const rawStorage = localStorage.getItem('physiolife_admin_therapists');
      if (rawStorage) {
        const list = JSON.parse(rawStorage);
        if (Array.isArray(list)) {
          const match = list.find(d => {
            const docId = (d.id || '').toLowerCase();
            const docName = (d.name || '').toLowerCase();
            return docId === raw || docId === cleanSlug || (cleanSlug && docName.includes(cleanSlug)) || docName.includes(raw);
          });
          if (match) return match.id;
        }
      }
    } catch (e) {}

    // Default fallback
    return 'jenkins';
  }

  // =========================================================================
  // 3. Dynamic DOM Renderer on therapist-details.html
  // =========================================================================
  function renderTherapistDetails() {
    const isTherapistDetailsPage = window.location.pathname.toLowerCase().includes('therapist-details') ||
      window.location.href.toLowerCase().includes('therapist-details.html');
    if (!isTherapistDetailsPage) return;

    let rawParam = '';
    try {
      const params = new URLSearchParams(window.location.search);
      rawParam = (params.get('id') || params.get('doctor') || params.get('therapist') || '').toLowerCase().trim();
      if (!rawParam && window.location.hash) {
        rawParam = window.location.hash.replace('#', '').toLowerCase().trim();
      }
    } catch (e) {}

    const therapistId = getRequestedTherapistId();
    let doc = THERAPISTS_DATA[therapistId];

    // If doc not found in static table, or therapistId fell back to jenkins when another rawParam was passed
    if (!doc || (therapistId === 'jenkins' && rawParam && rawParam !== 'jenkins')) {
      try {
        const rawStorage = localStorage.getItem('physiolife_admin_therapists');
        if (rawStorage) {
          const list = JSON.parse(rawStorage);
          if (Array.isArray(list)) {
            const cleanRaw = rawParam.replace(/^dr[-_.\s]*/i, '');
            const match = list.find(d => {
              const dId = (d.id || '').toLowerCase();
              const dName = (d.name || '').toLowerCase();
              return dId === rawParam || dId === cleanRaw || (cleanRaw && dName.includes(cleanRaw)) || dName.includes(rawParam);
            });
            if (match) {
              const avatarImg = match.avatar ? match.avatar.replace('../', '') : 'assets/images/therapist-1.svg';
              doc = {
                id: match.id,
                name: match.name,
                fullName: `${match.name}, ${match.qualifications || 'PT, DPT'}`,
                titleRole: `${match.department} Specialist`,
                sidebarRole: `${match.department} Specialist`,
                specialty: match.department,
                degree: match.qualifications || 'PT, DPT, OCS',
                experience: 'Licensed Clinical Specialist',
                rating: `${match.rating || '5.0'} / 5.0 (${match.reviewsCount || '18'} Reviews)`,
                languages: 'English',
                image: avatarImg,
                heroImage: 'assets/images/therapist-consult-jenkins.jpg',
                heroAlt: `${match.name} consultation session`,
                bioTitle: `Biography & Clinical Philosophy`,
                bioParagraphs: [
                  `${match.name} is a licensed physical therapy practitioner at PhysioLife Clinic specializing in ${match.department}.`,
                  `With expertise in clinical evaluation, therapeutic exercise prescription, and biomechanical movement analysis, ${match.name} works closely with each patient to restore mobility and alleviate pain.`,
                  `Currently managing an active caseload of ${match.caseload || '15 Patients'} and accepting new patient consultations.`
                ],
                credentials: [
                  { icon: 'fas fa-graduation-cap', color: 'text-primary', title: 'Clinical Qualifications', desc: match.qualifications || 'PT, DPT, OCS' },
                  { icon: 'fas fa-id-card', color: 'text-success', title: 'State Medical License', desc: match.license || 'Certified Practitioner' },
                  { icon: 'fas fa-stethoscope', color: 'text-info', title: 'Clinical Specialty', desc: match.department },
                  { icon: 'fas fa-star', color: 'text-warning', title: 'Patient Satisfaction', desc: `${match.rating || '5.0'} / 5.0 Star Rating` }
                ],
                hours: {
                  monWed: '8:00 AM – 4:00 PM',
                  thuFri: '9:00 AM – 5:00 PM',
                  sat: 'By Appointment Only'
                },
                bookingTitle: `Request Appointment with ${match.name}`,
                bookingSubtitle: `Reserve an evaluation block directly with our ${match.department} specialist.`,
                successMsg: `Evaluation request received for ${match.name}! We will call you within 15 minutes.`
              };
            }
          }
        }
      } catch (e) {
        console.warn('Error reading custom therapist from storage:', e);
      }
    }

    if (!doc) doc = THERAPISTS_DATA['jenkins'];

    // Page title & meta
    document.title = `${doc.name} – PhysioLife Specialist Profile`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `Profile and clinical schedule for ${doc.fullName}. ${doc.titleRole} at PhysioLife Rehabilitation Clinic.`);
    }

    // 1. Breadcrumb
    const breadcrumb = document.getElementById('therapistBreadcrumb');
    if (breadcrumb) breadcrumb.textContent = doc.name;

    // 2. Banner
    const bannerTitle = document.getElementById('therapistBannerTitle');
    if (bannerTitle) bannerTitle.textContent = doc.fullName;
    const bannerSubtitle = document.getElementById('therapistBannerSubtitle');
    if (bannerSubtitle) bannerSubtitle.textContent = doc.titleRole;

    // 3. Sidebar Profile Card
    const profileImg = document.getElementById('therapistProfileImg');
    if (profileImg) {
      profileImg.src = doc.image;
      profileImg.alt = `${doc.name} - Physical Therapy Specialist`;
      profileImg.onerror = function () {
        this.onerror = null;
        this.src = 'assets/images/therapist-1.svg';
      };
    }
    const sidebarName = document.getElementById('therapistSidebarName');
    if (sidebarName) sidebarName.textContent = doc.name;
    const sidebarRole = document.getElementById('therapistSidebarSpecialty');
    if (sidebarRole) sidebarRole.textContent = doc.sidebarRole;

    const degreeEl = document.getElementById('therapistDegree');
    if (degreeEl) degreeEl.textContent = doc.degree;
    const specialtyEl = document.getElementById('therapistSpecialtyTag');
    if (specialtyEl) specialtyEl.textContent = doc.specialty;
    const expEl = document.getElementById('therapistExperience');
    if (expEl) expEl.textContent = doc.experience;
    const ratingEl = document.getElementById('therapistRating');
    if (ratingEl) ratingEl.textContent = doc.rating;
    const langEl = document.getElementById('therapistLanguages');
    if (langEl) langEl.textContent = doc.languages;

    // Social & Contact Links in Sidebar
    const linkedinLink = document.getElementById('therapistSocialLinkedIn');
    if (linkedinLink) {
      linkedinLink.href = doc.socials?.linkedin || `https://www.linkedin.com/in/${doc.id}-pt`;
      if (typeof linkedinLink.setAttribute === 'function') {
        linkedinLink.setAttribute('aria-label', `${doc.name} LinkedIn Profile`);
      }
    }
    const twitterLink = document.getElementById('therapistSocialTwitter');
    if (twitterLink) {
      const cleanName = doc.name.replace(/^(Dr\.\s*|Prof\.\s*)/i, '').replace(/[^a-zA-Z]/g, '');
      twitterLink.href = doc.socials?.twitter || `https://twitter.com/Dr${cleanName}`;
      if (typeof twitterLink.setAttribute === 'function') {
        twitterLink.setAttribute('aria-label', `${doc.name} Twitter Profile`);
      }
    }
    const emailLink = document.getElementById('therapistSocialEmail');
    if (emailLink) {
      emailLink.href = doc.socials?.email || `mailto:${doc.id}@physiolifeclinic.com`;
      if (typeof emailLink.setAttribute === 'function') {
        emailLink.setAttribute('aria-label', `Email ${doc.name}`);
      }
    }

    // 4. Hours
    const h1 = document.getElementById('therapistHoursMonWed');
    if (h1 && doc.hours) h1.textContent = doc.hours.monWed;
    const h2 = document.getElementById('therapistHoursThuFri');
    if (h2 && doc.hours) h2.textContent = doc.hours.thuFri;
    const h3 = document.getElementById('therapistHoursSat');
    if (h3 && doc.hours) h3.textContent = doc.hours.sat;

    // 5. Hero Consultation Image
    const heroImg = document.getElementById('therapistHeroImg');
    if (heroImg) {
      heroImg.src = doc.heroImage || 'assets/images/clinic-interior.jpg';
      heroImg.alt = doc.heroAlt || `${doc.name} consultation`;
      heroImg.onerror = function () {
        this.onerror = null;
        this.src = 'assets/images/clinic-interior.jpg';
      };
    }

    // 6. Bio
    const bioTitle = document.getElementById('therapistBioTitle');
    if (bioTitle) bioTitle.textContent = doc.bioTitle;
    const bioContainer = document.getElementById('therapistBioContainer');
    if (bioContainer && Array.isArray(doc.bioParagraphs)) {
      bioContainer.innerHTML = doc.bioParagraphs.map(p => `<p>${p}</p>`).join('');
    }

    // 7. Credentials Cards
    const credContainer = document.getElementById('therapistCredentialsContainer');
    if (credContainer && Array.isArray(doc.credentials)) {
      credContainer.innerHTML = doc.credentials.map(c => `
        <div class="col-md-6">
          <div class="p-3 bg-surface-alt rounded-3 border border-subtle h-100">
            <h6 class="fw-bold mb-1"><i class="${c.icon} ${c.color} me-2"></i> ${c.title}</h6>
            <p class="small text-muted mb-0">${c.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // 8. Direct Booking Form
    const bookHeading = document.getElementById('therapistBookingHeader');
    if (bookHeading) {
      bookHeading.innerHTML = `<i class="fas fa-calendar-check text-primary me-2"></i> ${doc.bookingTitle}`;
    }
    const bookSub = document.getElementById('therapistBookingSubtitle');
    if (bookSub) bookSub.textContent = doc.bookingSubtitle;
    const bookAlert = document.getElementById('therapistFormAlert');
    if (bookAlert) {
      bookAlert.innerHTML = `<i class="fas fa-check-circle me-2"></i> ${doc.successMsg}`;
    }
    const submitBtn = document.getElementById('therapistSubmitBtn');
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fas fa-check me-2"></i> Request Evaluation with ${doc.name}`;
    }

    // Preselect in booking modal if available
    const bookTherapistSelect = document.getElementById('bookTherapist');
    if (bookTherapistSelect && bookTherapistSelect.options) {
      if (!Array.from(bookTherapistSelect.options).some(opt => opt && opt.value === doc.id)) {
        if (typeof document.createElement === 'function') {
          const newOpt = document.createElement('option');
          newOpt.value = doc.id;
          newOpt.textContent = `${doc.name} (${doc.specialty})`;
          bookTherapistSelect.appendChild(newOpt);
        }
      }
      bookTherapistSelect.value = doc.id;
    }
  }

  // Run on DOM ready and history changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTherapistDetails);
  } else {
    renderTherapistDetails();
  }
  window.addEventListener('popstate', renderTherapistDetails);

  // Export for external verification or manual testing
  window.PhysioLifeTherapists = {
    data: THERAPISTS_DATA,
    render: renderTherapistDetails,
    getRequestedTherapistId: getRequestedTherapistId
  };
})();
