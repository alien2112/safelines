export type Language = 'ar' | 'en';

export interface Translations {
  // Common
  common: {
    readMore: string;
    subscribe: string;
    submit: string;
    send: string;
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  
  // About Page
  about: {
    hero: {
      title: string;
      subtitle: string;
    };
    mission: {
      title: string;
      text: string;
    };
    vision: {
      title: string;
      milestones: Array<{
        year: string;
        title: string;
        description: string;
      }>;
    };
    whyChoose: {
      title: string;
      subtitle: string;
      features: Array<{
        name: string;
        role: string;
        bio: string;
      }>;
    };
    values: {
      title: string;
      items: Array<{
        title: string;
        text: string;
      }>;
    };
    stats: {
      experience: string;
      clients: string;
      team: string;
    };
  };

  // Contact Page
  contact: {
    title: string;
    points: string[];
    cards: {
      email: {
        title: string;
        description: string;
      };
      phone: {
        title: string;
        description: string;
      };
      address: {
        title: string;
        description: string;
        details: string;
        lines?: string[];
      };
      website: {
        title: string;
        description: string;
      };
    };
    form: {
      name: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      requiredService: string;
      requiredServicePlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
    };
  };

  // Blog Page
  blog: {
    hero: {
      title: string;
      subtitle: string;
    };
    newsletter: {
      title: string;
      text: string;
      emailPlaceholder: string;
      subscribe: string;
    };
  };

  // Admin Page
  admin: {
    login: {
      title: string;
      password: string;
      passwordPlaceholder: string;
      signIn: string;
      signingIn: string;
      incorrectPassword: string;
    };
    sidebar: {
      adminPanel: string;
      toggleSidebar: string;
      logout: string;
      images: string;
      blog: string;
      services: string;
      jobs: string;
      seoConfig: string;
      linkMappings: string;
    };
    images: {
      title: string;
      description: string;
      uploadImage: string;
      section: string;
      sectionHomePage: string;
      sectionAboutPage: string;
      noFileChosen: string;
      upload: string;
      imagesInSection: string;
      delete: string;
      noImagesYet: string;
    };
    blog: {
      title: string;
      description: string;
      newPost: string;
      published: string;
      draft: string;
      edit: string;
      delete: string;
      noPostsYet: string;
      createFirstPost: string;
      modal: {
        editPost: string;
        newPost: string;
        seo: string;
        links: string;
        preview: string;
        edit: string;
        titleEn: string;
        titleAr: string;
        excerptEn: string;
        excerptAr: string;
        contentEn: string;
        contentAr: string;
        category: string;
        tags: string;
        featuredImage: string;
        slug: string;
        published: string;
        seoSettings: string;
        seoTitle: string;
        seoDescription: string;
        seoKeywords: string;
        internalLinks: string;
        addLink: string;
        remove: string;
        cancel: string;
        save: string;
        upload: string;
      };
    };
    services: {
      title: string;
      description: string;
      newService: string;
      edit: string;
      delete: string;
      featured: string;
      noServicesYet: string;
      createFirstService: string;
      modal: {
        editService: string;
        newService: string;
        titleEn: string;
        titleAr: string;
        descriptionEn: string;
        descriptionAr: string;
        image: string;
        icon: string;
        slug: string;
        detailedDescriptionEn: string;
        detailedDescriptionAr: string;
        visible: string;
        featured: string;
        processSteps: string;
        addStep: string;
        benefits: string;
        addBenefit: string;
        testimonials: string;
        addTestimonial: string;
        remove: string;
        cancel: string;
        save: string;
        clear: string;
      };
    };
    jobs: {
      title: string;
      description: string;
      newJob: string;
      published: string;
      draft: string;
      edit: string;
      delete: string;
      noJobsYet: string;
      createFirstJob: string;
      modal: {
        editJob: string;
        newJob: string;
        jobTitleEn: string;
        jobTitleAr: string;
        jobDescriptionEn: string;
        jobDescriptionAr: string;
        jobImage: string;
        published: string;
        cancel: string;
        save: string;
      };
    };
  };

  // Jobs Page
  jobs: {
    hero: {
      title: string;
      subtitle: string;
    };
    noJobs: {
      title: string;
      subtitle: string;
      description: string;
    };
    card: {
      apply: string;
      viewDetails: string;
    };
    admin: {
      title: string;
      subtitle: string;
      form: {
        title: string;
        titleAr: string;
        description: string;
        descriptionAr: string;
        image: string;
        published: string;
        submit: string;
        cancel: string;
        delete: string;
        edit: string;
        createNew: string;
      };
    };
  };

  // Home Page
  home: {
    hero: {
      tag: string;
      title: string;
      cta: string;
      trust: string;
    };
    projects: {
      tag: string;
      title: string;
      subtitle: string;
    };
    about: {
      tag: string;
      title: string;
      subtitle: string;
      cards: Array<{
        title: string;
        description: string;
      }>;
      stats: Array<{
        number: string;
        label: string;
      }>;
    };
    services: {
      title: string;
      bullets: string[];
      transportation: {
        title: string;
        services: Array<{
          title: string;
          description: string;
        }>;
      };
      customs: {
        title: string;
        services: Array<{
          title: string;
          description: string;
        }>;
      };
      chips: Array<{
        label: string;
      }>;
      page: {
        hero: {
          badge: string;
          title: string;
          subtitle: string;
          cta: string;
        };
        categories: {
          all: string;
          transportation: string;
          customs: string;
          support: string;
        };
        track: {
          link: string;
          title: string;
          subtitle: string;
          cta: string;
        };
        noServices: string;
        learnMore: string;
        modal: {
          tabs: {
            overview: string;
            process: string;
            pricing: string;
          };
          overview: string;
          pricing: string;
          processSteps: Array<{
            title: string;
            description: string;
          }>;
          actions: {
            request: string;
            viewDetails: string;
            close: string;
          };
        };
      };
    };
    cta: {
      title: string;
      badges: Array<{
        text: string;
      }>;
      actions: {
        more: string;
        contact: string;
      };
    };
    faq: {
      title: string;
      subtitle: string;
      cta: string;
      mail: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
    pricing: {
      tag: string;
      title: string;
      subtitle: string;
      toggle: {
        monthly: string;
        yearly: string;
      };
      cards: Array<{
        title: string;
        more: string;
      }>;
      footer: string;
    };
    footer: {
      brand: {
        tagline: string;
        description: string;
      };
      quickLinks: {
        title: string;
      };
      jobs: {
        title: string;
        subtitle: string;
        cta: string;
        hiring: string;
      };
      social: {
        title: string;
      };
      copyright: {
        text: string;
        rights: string;
        designer: string;
        designerName: string;
        followUs: string;
      };
      links: Array<{
        label: string;
        href: string;
      }>;
    };
    testimonials: {
      tag: string;
      title: string;
      subtitle: string;
      totalReviews: string;
      items: Array<{
        name: string;
        source: string;
        review: string;
      }>;
    };
    makingEasy: {
      title: string;
      quote: string;
      quoteAuthor: string;
      jobOpenings: string;
      contact: string;
    };
    strategy: {
      title: string;
      before: string;
      after: string;
      metrics: Array<{
        label: string;
        beforeLabel: string;
        afterLabel: string;
      }>;
      bookCall: string;
      contact: string;
    };
    community: {
      tag: string;
      title: string;
      subtitle: string;
      socials: string;
      cards: Array<{
        id: string;
        title: string;
        description: string;
        stats: string[];
      }>;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      readMore: 'Read More',
      subscribe: 'Subscribe',
      submit: 'Submit',
      send: 'Send',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      website: 'Website',
    },
    about: {
      hero: {
        title: 'Safe Lines Customs Clearance',
        subtitle: 'Founded in Jeddah with an ambitious and pioneering vision in the field of customs clearance and transportation within the Kingdom, the company has provided distinguished services to a number of companies and establishments in various sectors.',
      },
      mission: {
        title: 'Our Mission',
        text: 'To be one of the pillars of national and regional development through the logistical services we provide to contribute to the renaissance and progress of this country. Providing the best logistical solutions in the fields of customs clearance and transportation to be us and our success partners among the leading companies in the Middle East.',
      },
      vision: {
        title: 'Our Vision',
        milestones: [
          {
            year: 'Foundation',
            title: 'Beginning in Jeddah',
            description: 'Founded in Jeddah with an ambitious and pioneering vision in the field of customs clearance and transportation within the Kingdom, the company has provided distinguished services to a number of companies and establishments in various sectors.',
          },
          {
            year: 'Development',
            title: 'Specialized Company',
            description: 'As part of this success, a specialized customs clearance company was established in Jeddah to facilitate the flow of goods and provide comprehensive and smooth services to our clients.',
          },
          {
            year: 'Excellence',
            title: 'Trained Staff',
            description: 'With a focus on carefully recruiting trained staff to meet customer needs, we ensure the provision of the best logistics and customs clearance services.',
          },
          {
            year: 'Future',
            title: 'Continuous Leadership',
            description: 'We continue to provide professional and distinguished services in the field of customs clearance and transportation, with our constant commitment to achieving the highest standards of quality and efficiency.',
          },
        ],
      },
      whyChoose: {
        title: 'Why Choose Our Company?',
        subtitle: 'We work with precision and professionalism in receiving your requests, inquiries, and opinions to get the best experience and service we can provide to you. We also have diverse and sufficient experience to solve and complete all logistics procedures for all types of goods and products, and our approach depends on customer needs and opinions that combine deep knowledge of trade and long-term commitment towards continuous success.',
        features: [
          {
            name: 'Save Money and Time',
            role: 'Cost Effectiveness',
            bio: 'We provide effective solutions that help you save money and time by improving customs and logistics operations.',
          },
          {
            name: 'Vast Storage Spaces',
            role: 'Safe Environment',
            bio: 'We provide vast spaces and a safe storage environment with increased work efficiency and reduced risks of floor accumulation.',
          },
          {
            name: 'Accuracy and Flexibility',
            role: 'Integrated Service',
            bio: 'Accuracy and flexibility in the process of receiving shipments after storage with guaranteed fast and safe delivery.',
          },
          {
            name: 'Integrated Transport Services',
            role: 'Comprehensive Coverage',
            bio: 'We provide integrated transport services covering all seaports, airports, and land ports, and we cover all types of containers and parcels.',
          },
        ],
      },
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'Integrity',
            text: 'We conduct business with the highest ethical standards and transparency.',
          },
          {
            title: 'Efficiency',
            text: 'We streamline processes to save time and reduce costs for our clients.',
          },
          {
            title: 'Excellence',
            text: 'We strive for perfection in every interaction and transaction.',
          },
          {
            title: 'Partnership',
            text: 'We build long-term relationships based on trust and mutual success.',
          },
        ],
      },
      stats: {
        experience: 'Years of Experience',
        clients: 'Happy Clients',
        team: 'Expert Team Members',
      },
    },
    contact: {
      title: 'We Are Happy to Hear From You',
      points: [
        'We work with precision and professionalism in receiving your requests and inquiries',
        'Our team is available to serve customers according to official working hours',
      ],
      cards: {
        email: {
          title: 'Email',
          description: 'Contact us via email',
        },
        phone: {
          title: 'Phone',
          description: 'Call us directly',
        },
        address: {
          title: 'Address',
          description: 'Jeddah - Al-Baghdadiyah Al-Gharbiyah - Al-Madina Street',
          details: 'Peace Business Center - 4th Floor - Office 402',
          lines: [
            'Jeddah',
            'Al-Baghdadiyah Al-Gharbiyah',
            'Al-Madina Street',
            'Peace Business Center',
            '4th Floor',
            'Office 402',
          ],
        },
        website: {
          title: 'Website',
          description: 'Visit our website',
        },
      },
      form: {
        name: 'Name',
        namePlaceholder: 'Enter your name',
        emailPlaceholder: 'example@email.com',
        subject: 'Subject',
        subjectPlaceholder: 'Inquiry subject',
        requiredService: 'Required Service',
        requiredServicePlaceholder: 'Select Required Service',
        message: 'Message',
        messagePlaceholder: 'Write your message here...',
        submit: 'Send',
      },
    },
    admin: {
      login: {
        title: 'Admin Dashboard',
        password: 'Password',
        passwordPlaceholder: 'Enter admin password',
        signIn: 'Sign In',
        signingIn: 'Signing in...',
        incorrectPassword: 'Incorrect password',
      },
      sidebar: {
        adminPanel: 'Admin Panel',
        toggleSidebar: 'Toggle sidebar',
        logout: 'Logout',
        images: 'Images',
        blog: 'Blog',
        services: 'Services',
        jobs: 'Jobs',
        seoConfig: 'SEO Config',
        linkMappings: 'Link Mappings',
      },
      images: {
        title: 'Images Management',
        description: 'Manage homepage images, hero banners, and about page images per section. Latest upload is displayed.',
        uploadImage: 'Upload Image',
        section: 'Section',
        sectionHomePage: 'Home Page',
        sectionAboutPage: 'About Page',
        noFileChosen: 'No file chosen',
        upload: 'Upload',
        imagesInSection: 'Images in Section',
        delete: 'Delete',
        noImagesYet: 'No images yet',
      },
      blog: {
        title: 'Blog Management',
        description: 'Create, edit, and manage blog posts',
        newPost: '+ New Post',
        published: 'Published',
        draft: 'Draft',
        edit: 'Edit',
        delete: 'Delete',
        noPostsYet: 'No blog posts yet.',
        createFirstPost: 'Create your first post!',
        modal: {
          editPost: 'Edit Post',
          newPost: 'New Post',
          seo: 'SEO',
          links: 'Links',
          preview: 'Preview',
          edit: 'Edit',
          titleEn: 'Title (English)',
          titleAr: 'Title (Arabic)',
          excerptEn: 'Excerpt (English)',
          excerptAr: 'Excerpt (Arabic)',
          contentEn: 'Content (English)',
          contentAr: 'Content (Arabic)',
          category: 'Category',
          tags: 'Tags (comma-separated)',
          featuredImage: 'Featured Image',
          slug: 'Slug (URL-friendly)',
          published: 'Published',
          seoSettings: 'SEO Settings',
          seoTitle: 'SEO Title (optional, defaults to title)',
          seoDescription: 'SEO Description (optional, defaults to excerpt)',
          seoKeywords: 'SEO Keywords (comma-separated)',
          internalLinks: 'Internal Links',
          addLink: '+ Add Link',
          remove: 'Remove',
          cancel: 'Cancel',
          save: 'Save',
          upload: 'Upload',
        },
      },
      services: {
        title: 'Services Management',
        description: 'Manage services displayed on the main site',
        newService: '+ New Service',
        edit: 'Edit',
        delete: 'Delete',
        featured: 'Featured',
        noServicesYet: 'No services yet.',
        createFirstService: 'Create your first service!',
        modal: {
          editService: 'Edit Service',
          newService: 'New Service',
          titleEn: 'Title (English)',
          titleAr: 'Title (Arabic)',
          descriptionEn: 'Description (English)',
          descriptionAr: 'Description (Arabic)',
          image: 'Image',
          icon: 'Icon (for service card)',
          slug: 'Slug (URL-friendly identifier, e.g., "customs-clearance")',
          detailedDescriptionEn: 'Detailed Description (English) - For service detail page',
          detailedDescriptionAr: 'Detailed Description (Arabic)',
          visible: 'Visible on Services Page',
          featured: 'Featured on Homepage',
          processSteps: 'Process Steps',
          addStep: '+ Add Step',
          benefits: 'Benefits',
          addBenefit: '+ Add Benefit',
          testimonials: 'Testimonials',
          addTestimonial: '+ Add Testimonial',
          remove: 'Remove',
          cancel: 'Cancel',
          save: 'Save',
          clear: 'Clear',
        },
      },
      jobs: {
        title: 'Jobs Management',
        description: 'Create, edit, and manage job postings',
        newJob: '+ New Job',
        published: 'Published',
        draft: 'Draft',
        edit: 'Edit',
        delete: 'Delete',
        noJobsYet: 'No jobs yet.',
        createFirstJob: 'Create your first job posting!',
        modal: {
          editJob: 'Edit Job',
          newJob: 'New Job',
          jobTitleEn: 'Job Title (English)',
          jobTitleAr: 'Job Title (Arabic)',
          jobDescriptionEn: 'Job Description (English)',
          jobDescriptionAr: 'Job Description (Arabic)',
          jobImage: 'Job Image',
          published: 'Published',
          cancel: 'Cancel',
          save: 'Save Job',
        },
      },
    },
    blog: {
      hero: {
        title: 'Insights & Stories',
        subtitle: 'Discover the latest trends, best practices, and expert insights in customs clearance and international trade.',
      },
      newsletter: {
        title: 'Stay Updated',
        text: 'Get the latest articles and insights delivered to your inbox.',
        emailPlaceholder: 'Enter your email',
        subscribe: 'Subscribe',
      },
    },
    jobs: {
      hero: {
        title: 'Join Our Team',
        subtitle: 'Explore exciting career opportunities with Safe Lines Customs Clearance. We\'re looking for talented individuals to help us grow and excel.',
      },
      noJobs: {
        title: 'No Job Openings Available',
        subtitle: 'We\'re not hiring at the moment',
        description: 'Thank you for your interest in joining our team. Currently, we don\'t have any open positions, but we\'re always looking for exceptional talent. Please check back soon or contact us directly.',
      },
      card: {
        apply: 'Apply Now',
        viewDetails: 'View Details',
      },
      admin: {
        title: 'Jobs Management',
        subtitle: 'Create, edit, and manage job postings',
        form: {
          title: 'Job Title (English)',
          titleAr: 'Job Title (Arabic)',
          description: 'Job Description (English)',
          descriptionAr: 'Job Description (Arabic)',
          image: 'Job Image',
          published: 'Published',
          submit: 'Save Job',
          cancel: 'Cancel',
          delete: 'Delete',
          edit: 'Edit',
          createNew: 'Create New Job',
        },
      },
    },
    home: {
      hero: {
        tag: 'SAFE LINES CUSTOMS CLEARANCE',
        title: 'With us, your business has meaning',
        cta: 'Book A Free Call Now',
        trust: 'we have your trust',
      },
      projects: {
        tag: 'SERVICES',
        title: 'Our Core Services',
        subtitle: 'Comprehensive customs clearance and transportation solutions tailored to your business needs across the Kingdom.',
      },
      about: {
        tag: 'About us',
        title: 'long experience in our field',
        subtitle: 'We have long experience in our field, so we can provide you with distinguished services',
        cards: [
          {
            title: 'Land freight',
            description: 'The most important means of transportation between neighboring countries and within the country itself, as it is characterized by speed and efficiency in transporting large goods with heavy weights',
          },
          {
            title: 'Sea freight',
            description: 'Shipping by sea is done by ships and steamers of different sizes. Goods are transported in containers, which are large boxes made of strong and weather-resistant materials',
          },
          {
            title: 'Air freight',
            description: 'Air freight is the process of transporting goods and merchandise using aircraft specialized for these purposes.',
          },
          {
            title: 'customs clearance',
            description: 'Customs clearance is the process of completing customs procedures related to imports of goods into or exports of goods',
          },
        ],
        stats: [
          { number: '10k+', label: 'Happy users' },
          { number: '250k+', label: 'Total hrs saved' },
          { number: '4.8', label: 'Average Rating' },
        ],
      },
      services: {
        title: 'Services',
        bullets: [
          'Customs Clearance',
          'Transportation Services',
        ],
        // Transportation Services
        transportation: {
          title: 'Transportation Services',
          services: [
            {
              title: 'Transportation to customer warehouses throughout the Kingdom',
              description: 'We provide integrated transportation services covering all sea ports, air and land entry points, and all types of containers and parcels, including refrigerated and regular transport, ensuring fast and safe delivery to customer warehouses throughout the Kingdom.',
            },
            {
              title: 'Flexible distribution service',
              description: 'We provide a flexible distribution service that meets customer needs, ensuring the delivery of shipments to multiple locations according to the customer\'s desire, which facilitates the delivery of goods at specified times and locations.',
            },
            {
              title: 'Transportation and Storage to and from the Yard',
              description: 'Providing comprehensive yard services including saving money and time, vast spaces and a safe environment for storage, increasing work efficiency and reducing the risks of floor accumulation, and accuracy and flexibility in the process of receiving shipments after storage.',
            },
          ],
        },
        // Customs Clearance Services
        customs: {
          title: 'Customs Clearance Service',
          services: [
            {
              title: 'Customs Clearance for Exports and Imports',
              description: 'We work to facilitate all customs procedures for your commercial and personal exports and imports, ensuring fast clearance of shipments and reducing unnecessary delays.',
            },
            {
              title: 'SABER Certificate Issuance',
              description: 'We provide a specialized service for issuing product conformity certificates from the Saudi Standards, Metrology and Quality Organization (SABER) to ensure their compliance with the quality standards approved in the Saudi market.',
            },
            {
              title: 'SFDA Product Registration',
              description: 'We provide a service for registering food and pharmaceutical products with the Saudi Food and Drug Authority (SFDA) and issuing import approvals to ensure compliance with regulatory requirements and their entry into the Saudi market.',
            },
            {
              title: 'Follow-up and Tracking',
              description: 'We provide a continuous follow-up service for all shipments and track the progress of procedures from the country of origin to the destination to ensure timely arrival of shipments.',
            },
            {
              title: 'Avoiding Unnecessary Expenses',
              description: 'We guide you in reducing unnecessary costs according to the requirements for each type of product to avoid errors and prevent demurrage by improving customs and logistics operations and increasing operational efficiency.',
            },
            {
              title: '24/7 Customer Service',
              description: 'Our team is available to serve customers according to official working hours to ensure continuous support and respond to inquiries.',
            },
            {
              title: 'Customs and Logistics Consultations',
              description: 'We provide our clients with the best solutions and information regarding customs laws and logistics procedures to achieve safe shipping and smooth operations.',
            },
          ],
        },
        chips: [
          { label: 'Fast & Safe Delivery' },
          { label: '24/7 Support' },
          { label: 'Expert Team' },
          { label: 'Comprehensive Services' },
        ],
        page: {
          hero: {
            badge: 'Our Services',
            title: 'Modern, reliable services with a human touch',
            subtitle: 'Explore our portfolio across transportation, customs, and customer support. Built for speed, compliance, and clarity.',
            cta: 'View Services',
          },
          categories: {
            all: 'All Services',
            transportation: 'Transportation',
            customs: 'Customs',
            support: 'Support',
          },
          track: {
            link: 'Track / Request',
            title: 'Track or request a service',
            subtitle: 'Get started in minutes. We\'ll guide you through the process.',
            cta: 'Start Now',
          },
          noServices: 'No services available at the moment.',
          learnMore: 'Learn More',
          modal: {
            tabs: {
              overview: 'Overview',
              process: 'Process',
              pricing: 'Pricing',
            },
            overview: 'We deliver dependable outcomes with predictable timelines and transparent communication.',
            pricing: 'Pricing varies by scope. Contact us for a tailored quote.',
            processSteps: [
              {
                title: 'Submit your request',
                description: 'Share your requirements',
              },
              {
                title: 'We validate documentation',
                description: 'Our team checks documents',
              },
              {
                title: 'Execution and delivery',
                description: 'We execute and deliver',
              },
            ],
            actions: {
              request: 'Request this Service',
              viewDetails: 'View Full Details',
              close: 'Close',
            },
          },
        },
      },
      cta: {
        title: 'What you still waiting!!',
        badges: [
          { text: '100% safe payment' },
          { text: '10k+ people trust us' },
        ],
        actions: {
          more: 'Learn More',
          contact: 'Contact Sales Now',
        },
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: "We're here to help you with all your customs clearance and logistics needs. Find answers to the most common questions below.",
        cta: 'Contact Us Now',
        mail: 'EMAIL',
        items: [
          {
            question: 'What services does Safe Lines provide?',
            answer: 'Safe Lines provides comprehensive customs clearance and logistics services including customs clearance for exports and imports, SABER certificate issuance, SFDA product registration, transportation services, storage and yard services, shipment tracking, and customs consultations.',
          },
          {
            question: 'How long does customs clearance take?',
            answer: 'The duration varies depending on the type of goods, documentation completeness, and customs requirements. We work efficiently to minimize delays and typically complete standard clearances within 24-48 hours for properly documented shipments.',
          },
          {
            question: 'What documents are required for customs clearance?',
            answer: 'Required documents typically include commercial invoice, packing list, bill of lading or airway bill, certificate of origin, import license (if applicable), and any specific certificates required for your product type (SABER, SFDA, etc.). Our team will guide you on all required documentation.',
          },
          {
            question: 'Do you handle both commercial and personal shipments?',
            answer: 'Yes, we handle both commercial imports/exports and personal shipments. Our services are tailored to meet the specific requirements of each type, ensuring smooth clearance for both business and individual clients.',
          },
          {
            question: 'What is SABER and why do I need it?',
            answer: 'SABER (Saudi Product Safety Program) is a mandatory conformity assessment program for products imported into Saudi Arabia. We help you obtain SABER certificates to ensure your products comply with Saudi quality standards and can be cleared through customs.',
          },
          {
            question: 'Can you help with SFDA registration for food and pharmaceutical products?',
            answer: 'Yes, we provide specialized services for registering food and pharmaceutical products with the Saudi Food and Drug Authority (SFDA) and obtaining necessary import approvals to ensure compliance with regulatory requirements.',
          },
          {
            question: 'Do you provide shipment tracking services?',
            answer: 'Yes, we offer continuous tracking and follow-up services for all shipments from the country of origin to the final destination, ensuring you stay informed about your cargo status throughout the entire process.',
          },
          {
            question: 'What areas do you serve in Saudi Arabia?',
            answer: 'We provide customs clearance and logistics services across the Kingdom of Saudi Arabia, with our main operations based in Jeddah. We serve clients throughout the country, ensuring efficient service delivery wherever your shipments need to go.',
          },
          {
            question: 'How can I reduce customs clearance costs?',
            answer: 'Our team provides expert guidance on reducing unnecessary costs by optimizing documentation, avoiding common errors, preventing demurrage charges, and improving customs and logistics operations efficiency. We help you navigate regulations to minimize expenses.',
          },
          {
            question: 'What are your customer service hours?',
            answer: 'Our customer service team is available during official working hours to provide continuous support and respond to your inquiries. We ensure timely assistance for all your customs clearance and logistics needs.',
          },
        ],
      },
      pricing: {
        tag: 'PRICING',
        title: 'Pricing Shipping to all continents of the world',
        subtitle: 'We have long experience in our field, so we can provide you with distinguished services.',
        toggle: {
          monthly: 'Monthly',
          yearly: 'Yearly',
        },
        cards: [
          { title: 'ASIA', more: 'MORE' },
          { title: 'South America', more: 'MORE' },
          { title: 'AFRICA', more: 'MORE' },
        ],
        footer: 'We donate 2% of your membership to pediatric wellbeing',
      },
      footer: {
        brand: {
          tagline: 'Safe Lines Customs Clearance',
          description: 'Your trusted partner in customs clearance and logistics services across the Kingdom.',
        },
        quickLinks: {
          title: 'Quick Links',
        },
        jobs: {
          title: 'We\'re Hiring!',
          subtitle: 'Join our team and grow with us',
          cta: 'View All Jobs',
          hiring: 'Check All Job Openings',
        },
        social: {
          title: 'Follow Us',
        },
        copyright: {
          text: '© 2024 Safe Lines Customs Clearance. All rights reserved.',
          rights: 'All rights reserved.',
          designer: 'Designed by',
          designerName: 'Rawad Digital',
          followUs: 'Follow us',
        },
        links: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/contact' },
          { label: 'Jobs', href: '/jobs' },
        ],
      },
      testimonials: {
        tag: 'CUSTOMERS',
        title: 'Partners of success',
        subtitle: 'Real feedback from businesses and individuals who rely on our customs clearance and logistics services to power their operations',
        totalReviews: 'Over 15,725+ people gave us review',
        items: [
          {
            name: 'Ahmed Al-Mansouri',
            source: 'Al-Mansouri Trading Company',
            review: 'Working with Safe Lines has transformed our import operations. Their expertise in customs clearance and efficient handling of our shipments has saved us significant time and costs. The team is professional, responsive, and always delivers on time.',
          },
          {
            name: 'Sarah Ibrahim',
            source: 'Global Logistics Solutions',
            review: 'Safe Lines is our trusted partner for all customs clearance needs. Their comprehensive services covering sea ports, airports, and land ports, combined with their 24/7 support, make them the ideal choice for any business dealing with international trade.',
          },
          {
            name: 'Mohammed Abdullah',
            source: 'Abdullah Manufacturing Group',
            review: 'Since partnering with Safe Lines, we have seen remarkable improvements in our supply chain efficiency. Their expertise in SABER certificate issuance and SFDA registration has streamlined our product registration process significantly.',
          },
        ],
      },
      makingEasy: {
        title: 'Making future easy',
        quote: 'We Know your problems. We know your target audience and how you can grow rapidly with the help of automation',
        quoteAuthor: 'Co-founder at landerOS',
        jobOpenings: 'Check All Job Openings',
        contact: 'Contact Sales Now',
      },
      strategy: {
        title: 'Strategy & Content Creation',
        before: 'Before',
        after: 'After',
        metrics: [
          { label: 'Growth', beforeLabel: '+10%', afterLabel: '+250%' },
          { label: 'Efficiency', beforeLabel: '-50%', afterLabel: '+200%' },
          { label: 'Cost', beforeLabel: '+100%', afterLabel: '-100%' },
        ],
        bookCall: 'Book A Free Call Now',
        contact: 'Contact Sales Now',
      },
      community: {
        tag: 'COMMUNITY',
        title: 'Check our community',
        subtitle: 'Participate in our Instagram group to network with other individuals. Here, you\'re invited to inquire, discuss, and open support requests.',
        socials: 'Socials :',
        cards: [
          {
            id: 'instagram',
            title: 'Instagram',
            description: 'Join our Instagram and connect with social media creators, enthusiasts, share ideas, and grow together.',
            stats: ['15k members', 'Community'],
          },
          {
            id: 'twitter',
            title: 'X (Twitter)',
            description: 'Join us on X (Twitter) for timely updates, expert guides, and conversations with seasoned logistics partners.',
            stats: ['25k followers', 'Community'],
          },
          {
            id: 'tiktok',
            title: 'TikTok',
            description: 'Follow us on TikTok for daily behind-the-scenes clips, customs tips, and quick logistics explainers.',
            stats: ['40k avg views', 'Highlights'],
          },
          {
            id: 'facebook',
            title: 'Facebook',
            description: 'Become part of our Facebook group to ask questions, collaborate on shipments, and receive peer support.',
            stats: ['10k members', 'Discussions'],
          },
          {
            id: 'snapchat',
            title: 'Snapchat',
            description: 'Add us on Snapchat for instant updates, flash announcements, and on-the-ground shipping stories.',
            stats: ['8k friends', 'Stories'],
          },
          {
            id: 'whatsapp',
            title: 'WhatsApp',
            description: 'Chat with our team on WhatsApp for quick shipping questions, rate checks, and live updates.',
            stats: ['Direct support', '24/7'],
          },
        ],
      },
    },
  },
  ar: {
    common: {
      readMore: 'اقرأ المزيد',
      subscribe: 'اشترك',
      submit: 'إرسال',
      send: 'إرسال',
      email: 'البريد الإلكتروني',
      phone: 'هاتف',
      address: 'العنوان',
      website: 'الموقع الإلكتروني',
    },
    about: {
      hero: {
        title: 'شركة الخطوط الآمنة للتخليص الجمركي',
        subtitle: 'تأسست في مدينة جدة برؤية طموحة ورائدة في مجال التخليص الجمركي والنقل داخل المملكة، قدمت الشركة خدمات متميزة لعدد من الشركات والمنشآت في مختلف القطاعات.',
      },
      mission: {
        title: 'رسالتنا',
        text: 'هي أن نكون أحد دعائم التنمية الوطنية والإقليمية من خلال الخدمات اللوجستية التي نقدمها لتساهم في نهضة هذه البلاد وتقدمها. تقديم الحلول اللوجستية الأفضل في مجالي التخليص الجمركي والنقل لنكون نحن وشركاء النجاح في مصاف الشركات الشرق الأوسط.',
      },
      vision: {
        title: 'رؤيتنا',
        milestones: [
          {
            year: 'التأسيس',
            title: 'البداية في جدة',
            description: 'تأسست في مدينة جدة برؤية طموحة ورائدة في مجال التخليص الجمركي والنقل داخل المملكة، قدمت الشركة خدمات متميزة لعدد من الشركات والمنشآت في مختلف القطاعات.',
          },
          {
            year: 'التطوير',
            title: 'شركة متخصصة',
            description: 'في إطار هذا النجاح، تم إنشاء شركة متخصصة للتخليص الجمركي في مدينة جدة، لتيسير عملية تدفق البضائع وتقديم خدمات شاملة وسلسة لعملائنا.',
          },
          {
            year: 'التميز',
            title: 'الكوادر المدربة',
            description: 'مع التركيز على توظيف الكوادر المدربة بعناية لتنمية احتياجات العملاء، نضمن تقديم أفضل الخدمات اللوجستية والتخليص الجمركي.',
          },
          {
            year: 'المستقبل',
            title: 'الريادة المستمرة',
            description: 'نواصل تقديم خدمات احترافية ومتميزة في مجال التخليص الجمركي والنقل، مع التزامنا الدائم بتحقيق أعلى معايير الجودة والكفاءة.',
          },
        ],
      },
      whyChoose: {
        title: 'لماذا تختار شركتنا؟',
        subtitle: 'نعمل بكل دقة واحترافية باستقبال طلباتكم واستفساراتكم وآرائكم لكي نحصل على أفضل تجربة وخدمة نستطيع تقديمها لكم، كما أن لدينا الخبرة المتنوعة والكافية لحل وإنهاء جميع إجراءات الخدمات اللوجستية لكافة أنواع البضائع والمنتجات، ويعتمد نهجنا على احتياجات وآراء العملاء التي تجمع بين المعرفة العميقة بالتجارة والالتزام طويل الأجل نحو نجاح متواصل.',
        features: [
          {
            name: 'توفير المال والوقت',
            role: 'فعالية التكاليف',
            bio: 'نقدم حلولاً فعالة تساعدك على توفير المال والوقت من خلال تحسين العمليات الجمركية واللوجستية.',
          },
          {
            name: 'مساحات شاسعة للتخزين',
            role: 'بيئة آمنة',
            bio: 'نوفر مساحات شاسعة وبيئة آمنة للتخزين مع رفع كفاءة العمل وتقليل مخاطر تراكم الأرضيات.',
          },
          {
            name: 'الدقة والمرونة',
            role: 'خدمة متكاملة',
            bio: 'الدقة والمرونة في عملية استلام الشحنات ما بعد التخزين مع ضمان التوصيل السريع والآمن.',
          },
          {
            name: 'خدمات نقل متكاملة',
            role: 'تغطية شاملة',
            bio: 'نقدم خدمات نقل متكاملة تشمل جميع الموانئ البحرية والمنافذ الجوية والبرية ونغطي جميع أنواع الحاويات والطرود.',
          },
        ],
      },
      values: {
        title: 'قيمنا',
        items: [
          {
            title: 'النزاهة',
            text: 'نتعامل بأعلى معايير الأخلاق والشفافية في العمل.',
          },
          {
            title: 'الكفاءة',
            text: 'نبسط العمليات لتوفير الوقت وتقليل التكاليف لعملائنا.',
          },
          {
            title: 'التميز',
            text: 'نسعى للكمال في كل تفاعل ومعاملة.',
          },
          {
            title: 'الشراكة',
            text: 'نبني علاقات طويلة الأمد مبنية على الثقة والنجاح المشترك.',
          },
        ],
      },
      stats: {
        experience: 'سنوات من الخبرة',
        clients: 'عميل سعيد',
        team: 'أعضاء فريق خبراء',
      },
    },
    contact: {
      title: 'يسعدنا تواصلك معنا',
      points: [
        'نعمل بكل دقة واحترافية باستقبال طلباتكم واستفساراتكم',
        'فريقنا متاح لخدمة العملاء وفقاً لأوقات العمل الرسمية',
      ],
      cards: {
        email: {
          title: 'البريد الإلكتروني',
          description: 'تواصل معنا عبر البريد الإلكتروني',
        },
        phone: {
          title: 'هاتف',
          description: 'اتصل بنا مباشرة على',
        },
        address: {
          title: 'العنوان',
          description: 'جدة - البغدادية الغربية - شارع المدن',
          details: 'مركز السلام للأعمال - الدور ٤ - مكتب ٤٠٢',
          lines: [
            'جدة',
            'البغدادية الغربية',
            'شارع المدن',
            'مركز السلام للأعمال',
            'الدور ٤',
            'مكتب ٤٠٢',
          ],
        },
        website: {
          title: 'الموقع الإلكتروني',
          description: 'زوروا موقعنا الإلكتروني',
        },
      },
      form: {
        name: 'الاسم',
        namePlaceholder: 'أدخل اسمك',
        emailPlaceholder: 'example@email.com',
        subject: 'موضوع الرسالة',
        subjectPlaceholder: 'موضوع الاستفسار',
        requiredService: 'الخدمة المطلوبة',
        requiredServicePlaceholder: 'اختر الخدمة المطلوبة',
        message: 'الرسالة',
        messagePlaceholder: 'اكتب رسالتك هنا...',
        submit: 'إرسال',
      },
    },
    admin: {
      login: {
        title: 'لوحة تحكم الإدارة',
        password: 'كلمة المرور',
        passwordPlaceholder: 'أدخل كلمة مرور الإدارة',
        signIn: 'تسجيل الدخول',
        signingIn: 'جارٍ تسجيل الدخول...',
        incorrectPassword: 'كلمة المرور غير صحيحة',
      },
      sidebar: {
        adminPanel: 'لوحة الإدارة',
        toggleSidebar: 'تبديل الشريط الجانبي',
        logout: 'تسجيل الخروج',
        images: 'الصور',
        blog: 'المدونة',
        services: 'الخدمات',
        jobs: 'الوظائف',
        seoConfig: 'إعدادات SEO',
        linkMappings: 'ربط الروابط',
      },
      images: {
        title: 'إدارة الصور',
        description: 'إدارة صور الصفحة الرئيسية واللافتات وصور صفحة من نحن لكل قسم. يتم عرض آخر تحميل.',
        uploadImage: 'رفع صورة',
        section: 'القسم',
        sectionHomePage: 'الصفحة الرئيسية',
        sectionAboutPage: 'صفحة من نحن',
        noFileChosen: 'لم يتم اختيار ملف',
        upload: 'رفع',
        imagesInSection: 'الصور في القسم',
        delete: 'حذف',
        noImagesYet: 'لا توجد صور بعد',
      },
      blog: {
        title: 'إدارة المدونة',
        description: 'إنشاء وتحرير وإدارة المقالات',
        newPost: '+ مقال جديد',
        published: 'منشور',
        draft: 'مسودة',
        edit: 'تعديل',
        delete: 'حذف',
        noPostsYet: 'لا توجد مقالات بعد.',
        createFirstPost: 'أنشئ مقالك الأول!',
        modal: {
          editPost: 'تعديل المقال',
          newPost: 'مقال جديد',
          seo: 'SEO',
          links: 'الروابط',
          preview: 'معاينة',
          edit: 'تعديل',
          titleEn: 'العنوان (الإنجليزية)',
          titleAr: 'العنوان (العربية)',
          excerptEn: 'الملخص (الإنجليزية)',
          excerptAr: 'الملخص (العربية)',
          contentEn: 'المحتوى (الإنجليزية)',
          contentAr: 'المحتوى (العربية)',
          category: 'الفئة',
          tags: 'العلامات (مفصولة بفواصل)',
          featuredImage: 'الصورة المميزة',
          slug: 'الرابط (صديق للـ URL)',
          published: 'منشور',
          seoSettings: 'إعدادات SEO',
          seoTitle: 'عنوان SEO (اختياري، افتراضي: العنوان)',
          seoDescription: 'وصف SEO (اختياري، افتراضي: الملخص)',
          seoKeywords: 'كلمات مفتاحية SEO (مفصولة بفواصل)',
          internalLinks: 'روابط داخلية',
          addLink: '+ إضافة رابط',
          remove: 'إزالة',
          cancel: 'إلغاء',
          save: 'حفظ',
          upload: 'رفع',
        },
      },
      services: {
        title: 'إدارة الخدمات',
        description: 'إدارة الخدمات المعروضة على الموقع الرئيسي',
        newService: '+ خدمة جديدة',
        edit: 'تعديل',
        delete: 'حذف',
        featured: 'مميز',
        noServicesYet: 'لا توجد خدمات بعد.',
        createFirstService: 'أنشئ خدمتك الأولى!',
        modal: {
          editService: 'تعديل الخدمة',
          newService: 'خدمة جديدة',
          titleEn: 'العنوان (الإنجليزية)',
          titleAr: 'العنوان (العربية)',
          descriptionEn: 'الوصف (الإنجليزية)',
          descriptionAr: 'الوصف (العربية)',
          image: 'الصورة',
          icon: 'الأيقونة (لبطاقة الخدمة)',
          slug: 'الرابط (معرف صديق للـ URL، مثل "customs-clearance")',
          detailedDescriptionEn: 'وصف مفصل (الإنجليزية) - لصفحة تفاصيل الخدمة',
          detailedDescriptionAr: 'وصف مفصل (العربية)',
          visible: 'مرئي على صفحة الخدمات',
          featured: 'مميز على الصفحة الرئيسية',
          processSteps: 'خطوات العملية',
          addStep: '+ إضافة خطوة',
          benefits: 'الفوائد',
          addBenefit: '+ إضافة فائدة',
          testimonials: 'الشهادات',
          addTestimonial: '+ إضافة شهادة',
          remove: 'إزالة',
          cancel: 'إلغاء',
          save: 'حفظ',
          clear: 'مسح',
        },
      },
      jobs: {
        title: 'إدارة الوظائف',
        description: 'إنشاء وتحرير وإدارة إعلانات الوظائف',
        newJob: '+ وظيفة جديدة',
        published: 'منشور',
        draft: 'مسودة',
        edit: 'تعديل',
        delete: 'حذف',
        noJobsYet: 'لا توجد وظائف بعد.',
        createFirstJob: 'أنشئ إعلان وظيفتك الأول!',
        modal: {
          editJob: 'تعديل الوظيفة',
          newJob: 'وظيفة جديدة',
          jobTitleEn: 'عنوان الوظيفة (الإنجليزية)',
          jobTitleAr: 'عنوان الوظيفة (العربية)',
          jobDescriptionEn: 'وصف الوظيفة (الإنجليزية)',
          jobDescriptionAr: 'وصف الوظيفة (العربية)',
          jobImage: 'صورة الوظيفة',
          published: 'منشور',
          cancel: 'إلغاء',
          save: 'حفظ الوظيفة',
        },
      },
    },
    blog: {
      hero: {
        title: 'رؤى وقصص',
        subtitle: 'اكتشف أحدث الاتجاهات وأفضل الممارسات ورؤى الخبراء في التخليص الجمركي والتجارة الدولية.',
      },
      newsletter: {
        title: 'ابق على اطلاع',
        text: 'احصل على أحدث المقالات والرؤى مباشرة إلى بريدك الإلكتروني.',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        subscribe: 'اشترك',
      },
    },
    jobs: {
      hero: {
        title: 'انضم إلى فريقنا',
        subtitle: 'استكشف فرص وظيفية مثيرة مع شركة الخطوط الآمنة للتخليص الجمركي. نحن نبحث عن أفراد موهوبين لمساعدتنا على النمو والتميز.',
      },
      noJobs: {
        title: 'لا توجد وظائف شاغرة',
        subtitle: 'نحن لا نوظف في الوقت الحالي',
        description: 'شكراً لاهتمامك بالانضمام إلى فريقنا. حالياً، ليس لدينا أي وظائف شاغرة، لكننا نبحث دائماً عن المواهب الاستثنائية. يرجى التحقق مرة أخرى قريباً أو الاتصال بنا مباشرة.',
      },
      card: {
        apply: 'تقدم الآن',
        viewDetails: 'عرض التفاصيل',
      },
      admin: {
        title: 'إدارة الوظائف',
        subtitle: 'إنشاء وتحرير وإدارة إعلانات الوظائف',
        form: {
          title: 'عنوان الوظيفة (الإنجليزية)',
          titleAr: 'عنوان الوظيفة (العربية)',
          description: 'وصف الوظيفة (الإنجليزية)',
          descriptionAr: 'وصف الوظيفة (العربية)',
          image: 'صورة الوظيفة',
          published: 'منشور',
          submit: 'حفظ الوظيفة',
          cancel: 'إلغاء',
          delete: 'حذف',
          edit: 'تعديل',
          createNew: 'إنشاء وظيفة جديدة',
        },
      },
    },
    home: {
      hero: {
        tag: 'شركة الخطوط الآمنة للتخليص الجمركي',
        title: 'معنا لتجارتك معني',
        cta: 'احجز مكالمة مجانية الآن',
        trust: 'نحن نمتلك ثقتك',
      },
      projects: {
        tag: 'الخدمات',
        title: 'خدماتنا الأساسية',
        subtitle: 'حلول شاملة للتخليص الجمركي والنقل مصممة خصيصاً لاحتياجات عملك في جميع أنحاء المملكة.',
      },
      about: {
        tag: 'من نحن',
        title: 'خبرة طويلة في مجالنا',
        subtitle: 'لدينا خبرة طويلة في مجالنا، لذا يمكننا تقديم خدمات متميزة لك',
        cards: [
          {
            title: 'الشحن البري',
            description: 'أهم وسائل النقل بين الدول المجاورة وداخل الدولة نفسها، حيث يتميز بالسرعة والكفاءة في نقل البضائع الكبيرة ذات الأوزان الثقيلة',
          },
          {
            title: 'الشحن البحري',
            description: 'يتم الشحن البحري بواسطة السفن والبواخر بأحجام مختلفة. يتم نقل البضائع في حاويات، وهي صناديق كبيرة مصنوعة من مواد قوية ومقاومة للعوامل الجوية',
          },
          {
            title: 'الشحن الجوي',
            description: 'الشحن الجوي هو عملية نقل البضائع والبضائع باستخدام الطائرات المتخصصة لهذه الأغراض.',
          },
          {
            title: 'التخليص الجمركي',
            description: 'التخليص الجمركي هو عملية إتمام الإجراءات الجمركية المتعلقة باستيراد البضائع أو تصديرها',
          },
        ],
        stats: [
          { number: '10k+', label: 'مستخدم سعيد' },
          { number: '250k+', label: 'إجمالي الساعات المحفوظة' },
          { number: '4.8', label: 'التقييم المتوسط' },
        ],
      },
      services: {
        title: 'الخدمات',
        bullets: [
          'التخليص الجمركي',
          'خدمات النقل',
        ],
        // Transportation Services
        transportation: {
          title: 'خدمات النقل',
          services: [
            {
              title: 'النقل إلى مستودعات العميل في جميع أنحاء المملكة',
              description: 'نقدم خدمات نقل متكاملة تشمل جميع الموانئ البحرية والمنافذ الجوية والبرية ونغطي جميع أنواع الحاويات والطرود، بما في ذلك النقل المبرد والنقل العادي مع ضمان توصيل سريع وآمن إلى مستودعات العملاء في مختلف أنحاء المملكة.',
            },
            {
              title: 'نوفر خدمة توزيع مرنة تتوافق مع احتياجات العملاء',
              description: 'حيث نضمن توصيل الشحنات إلى مواقع متعددة وفقا لرغبة العميل. مما يسهل توصيل البضائع في الوقت والمكان المحددين.',
            },
            {
              title: 'نقل وتخزين من وإلى الساحة',
              description: 'توفير المال والوقت، مساحات شاسعة وبيئة آمنة للتخزين، رفع كفاءة العمل وتقليل مخاطر تراكم الأرضيات، والدقة والمرونة في عملية استلام الشحنات ما بعد التخزين.',
            },
          ],
        },
        // Customs Clearance Services
        customs: {
          title: 'خدمة التخليص الجمركي',
          services: [
            {
              title: 'تخليص جمركي للصادرات والواردات',
              description: 'نعمل على تسهيل جميع الإجراءات الجمركية لصادراتكم ووارداتكم التجارية والشخصية، بما يضمن سرعة الفسح عن الشحنات وتقليل التأخير الغير الضروري.',
            },
            {
              title: 'استخراج شهادة هيئة المواصفات والمقاييس السعودية ( سابر )',
              description: 'نقدم خدمة متخصصة في استخراج شهادة المطابقة للمنتجات للتأكد من توافقها مع معايير الجودة المعتمدة في السوق السعودي.',
            },
            {
              title: 'تسجيل المنتجات في الهيئة العامة للغذاء والدواء (SFDA)',
              description: 'نوفر خدمة تسجيل المنتجات الغذائية والدوائية في الهيئة العامة للغذاء والدواء وإصدار الموافقة بالاستيراد لضمان الامتثال للمتطلبات التنظيمية ودخولها للسوق السعودي.',
            },
            {
              title: 'المتابعة والتعقيب',
              description: 'نوفر خدمة متابعة مستمرة لجميع الشحنات والتعقيب على سير الإجراءات من البلد المصدر إلى جهة الوصول لضمان وصول الشحنات في الوقت المناسب.',
            },
            {
              title: 'تجنب النفقات غير الضرورية',
              description: 'نرشدك في تقليل التكاليف الغير الضرورية حسب المتطلبات لكل نوع من المنتجات لتجنب الأخطاء وتفادياً للأرضيات من خلال تحسين العمليات الجمركية واللوجستية وزيادة الكفاءة التشغيلية.',
            },
            {
              title: 'تقديم خدمات العملاء على مدار الساعة',
              description: 'فريقنا متاح لخدمة العملاء وفقاً لأوقات العمل الرسمية لضمان تقديم الدعم المستمر والرد على الاستفسارات.',
            },
            {
              title: 'الاستشارات الجمركية واللوجستية',
              description: 'نزود عملاءنا بأفضل الحلول والمعلومات حول القوانين الجمركية والإجراءات اللوجستية لتحقيق شحن آمن وسلاسة في العمليات.',
            },
          ],
        },
        chips: [
          { label: 'نقل سريع وآمن' },
          { label: 'دعم على مدار الساعة' },
          { label: 'فريق خبراء' },
          { label: 'خدمات شاملة' },
        ],
        page: {
          hero: {
            badge: 'خدماتنا',
            title: 'خدمات حديثة وموثوقة بإنسانية',
            subtitle: 'استكشف محفظتنا عبر النقل والتخليص الجمركي وخدمة العملاء. مصممة للسرعة والامتثال والوضوح.',
            cta: 'عرض الخدمات',
          },
          categories: {
            all: 'جميع الخدمات',
            transportation: 'النقل',
            customs: 'الجمرك',
            support: 'الدعم',
          },
          track: {
            link: 'تتبع / طلب',
            title: 'تتبع أو طلب خدمة',
            subtitle: 'ابدأ في دقائق. سنرشدك خلال العملية.',
            cta: 'ابدأ الآن',
          },
          noServices: 'لا توجد خدمات متاحة في الوقت الحالي.',
          learnMore: 'اعرف المزيد',
          modal: {
            tabs: {
              overview: 'نظرة عامة',
              process: 'العملية',
              pricing: 'التسعير',
            },
            overview: 'نوفر نتائج موثوقة مع جداول زمنية متوقعة وتواصل شفاف.',
            pricing: 'يختلف التسعير حسب النطاق. اتصل بنا للحصول على عرض مخصص.',
            processSteps: [
              {
                title: 'قدم طلبك',
                description: 'شارك متطلباتك',
              },
              {
                title: 'نتحقق من الوثائق',
                description: 'يفحص فريقنا المستندات',
              },
              {
                title: 'التنفيذ والتسليم',
                description: 'ننفذ ونسلم',
              },
            ],
            actions: {
              request: 'طلب هذه الخدمة',
              viewDetails: 'عرض التفاصيل الكاملة',
              close: 'إغلاق',
            },
          },
        },
      },
      cta: {
        title: 'ماذا تنتظر بعد!!',
        badges: [
          { text: 'دفع آمن 100%' },
          { text: '10k+ شخص يثقون بنا' },
        ],
        actions: {
          more: 'المزيد',
          contact: 'اتصل بالمبيعات الآن',
        },
      },
      faq: {
        title: 'الأسئلة الشائعة',
        subtitle: 'نحن هنا لمساعدتك في جميع احتياجاتك في التخليص الجمركي واللوجستيات. ابحث عن إجابات لأكثر الأسئلة شيوعًا أدناه.',
        cta: 'اتصل بنا الآن',
        mail: 'البريد الإلكتروني',
        items: [
          {
            question: 'ما هي الخدمات التي تقدمها الخطوط الآمنة؟',
            answer: 'تقدم الخطوط الآمنة خدمات شاملة في التخليص الجمركي واللوجستيات تشمل التخليص الجمركي للصادرات والواردات، استخراج شهادات سابر، تسجيل منتجات هيئة الغذاء والدواء، خدمات النقل، خدمات التخزين والساحات، تتبع الشحنات، والاستشارات الجمركية.',
          },
          {
            question: 'كم تستغرق عملية التخليص الجمركي؟',
            answer: 'تختلف المدة حسب نوع البضائع، اكتمال الوثائق، ومتطلبات الجمارك. نعمل بكفاءة لتقليل التأخير وعادة ما نكمل التخليصات القياسية خلال 24-48 ساعة للشحنات الموثقة بشكل صحيح.',
          },
          {
            question: 'ما هي الوثائق المطلوبة للتخليص الجمركي؟',
            answer: 'الوثائق المطلوبة عادة تشمل الفاتورة التجارية، قائمة التعبئة، بوليصة الشحن أو بوليصة النقل الجوي، شهادة المنشأ، رخصة الاستيراد (إن وجدت)، وأي شهادات محددة مطلوبة لنوع منتجك (سابر، هيئة الغذاء والدواء، إلخ). سيرشدك فريقنا حول جميع الوثائق المطلوبة.',
          },
          {
            question: 'هل تتعاملون مع الشحنات التجارية والشخصية؟',
            answer: 'نعم، نتعامل مع الواردات/الصادرات التجارية والشحنات الشخصية. خدماتنا مصممة لتلبية المتطلبات المحددة لكل نوع، مما يضمن التخليص السلس لكل من عملاء الأعمال والأفراد.',
          },
          {
            question: 'ما هو سابر ولماذا أحتاجه؟',
            answer: 'سابر (برنامج سلامة المنتجات السعودي) هو برنامج تقييم المطابقة الإلزامي للمنتجات المستوردة إلى المملكة العربية السعودية. نساعدك في الحصول على شهادات سابر لضمان امتثال منتجاتك لمعايير الجودة السعودية ويمكن تخليصها من الجمارك.',
          },
          {
            question: 'هل يمكنكم المساعدة في تسجيل هيئة الغذاء والدواء للمنتجات الغذائية والدوائية؟',
            answer: 'نعم، نقدم خدمات متخصصة لتسجيل المنتجات الغذائية والدوائية لدى هيئة الغذاء والدواء السعودية والحصول على الموافقات اللازمة للاستيراد لضمان الامتثال للمتطلبات التنظيمية.',
          },
          {
            question: 'هل تقدمون خدمات تتبع الشحنات؟',
            answer: 'نعم، نقدم خدمات التتبع والمتابعة المستمرة لجميع الشحنات من بلد المنشأ إلى الوجهة النهائية، مما يضمن إبقاءك على اطلاع بحالة شحنتك طوال العملية بأكملها.',
          },
          {
            question: 'ما هي المناطق التي تخدمونها في المملكة العربية السعودية؟',
            answer: 'نقدم خدمات التخليص الجمركي واللوجستيات في جميع أنحاء المملكة العربية السعودية، مع عملياتنا الرئيسية في جدة. نخدم العملاء في جميع أنحاء البلاد، مما يضمن تقديم الخدمة بكفاءة أينما كانت وجهة شحناتك.',
          },
          {
            question: 'كيف يمكنني تقليل تكاليف التخليص الجمركي؟',
            answer: 'يوفر فريقنا إرشادات الخبراء لتقليل التكاليف غير الضرورية من خلال تحسين الوثائق، تجنب الأخطاء الشائعة، منع رسوم التأخير، وتحسين كفاءة عمليات الجمارك واللوجستيات. نساعدك في التنقل في اللوائح لتقليل النفقات.',
          },
          {
            question: 'ما هي ساعات خدمة العملاء لديكم؟',
            answer: 'فريق خدمة العملاء لدينا متاح خلال ساعات العمل الرسمية لتقديم الدعم المستمر والرد على استفساراتك. نضمن المساعدة في الوقت المناسب لجميع احتياجاتك في التخليص الجمركي واللوجستيات.',
          },
        ],
      },
      pricing: {
        tag: 'التسعير',
        title: 'تسعير الشحن إلى جميع قارات العالم',
        subtitle: 'لدينا خبرة طويلة في مجالنا، لذا يمكننا تقديم خدمات متميزة لك.',
        toggle: {
          monthly: 'شهري',
          yearly: 'سنوي',
        },
        cards: [
          { title: 'آسيا', more: 'المزيد' },
          { title: 'أمريكا الجنوبية', more: 'المزيد' },
          { title: 'أفريقيا', more: 'المزيد' },
        ],
        footer: 'نتبرع بنسبة 2% من عضويتك لرعاية الأطفال',
      },
      footer: {
        brand: {
          tagline: 'شركة الخطوط الآمنة للتخليص الجمركي',
          description: 'شريكك الموثوق في خدمات التخليص الجمركي واللوجستيات في جميع أنحاء المملكة.',
        },
        quickLinks: {
          title: 'روابط سريعة',
        },
        jobs: {
          title: 'نوظف الآن!',
          subtitle: 'انضم إلى فريقنا و نم معنا',
          cta: 'عرض جميع الوظائف',
          hiring: 'تحقق من جميع الوظائف الشاغرة',
        },
        social: {
          title: 'تابعنا',
        },
        copyright: {
          text: '© 2024 شركة الخطوط الآمنة للتخليص الجمركي. جميع الحقوق محفوظة.',
          rights: 'جميع الحقوق محفوظة.',
          designer: 'صمم بواسطة',
          designerName: 'رواد الرقمية',
          followUs: 'تابعنا',
        },
        links: [
          { label: 'الرئيسية', href: '/' },
          { label: 'من نحن', href: '/about' },
          { label: 'الخدمات', href: '/services' },
          { label: 'المدونة', href: '/blog' },
          { label: 'اتصل بنا', href: '/contact' },
          { label: 'الوظائف', href: '/jobs' },
        ],
      },
      testimonials: {
        tag: 'العملاء',
        title: 'شركاء النجاح',
        subtitle: 'تقييم وآراء عملاؤنا ما بعد الخدمة المقدمة لهم',
        totalReviews: 'أكثر من 15,725+ شخص قدموا لنا مراجعة',
        items: [
          {
            name: 'أحمد المنصوري',
            source: 'شركة المنصوري للتجارة',
            review: 'العمل مع الخطوط الآمنة غيّر عمليات الاستيراد لدينا بشكل كامل. خبرتهم في التخليص الجمركي ومعالجة الشحنات بكفاءة وفرت لنا وقتاً وتكاليف كبيرة. الفريق محترف ومتجاوب ويحقق دائماً في الوقت المحدد.',
          },
          {
            name: 'سارة إبراهيم',
            source: 'حلول اللوجستيات العالمية',
            review: 'الخطوط الآمنة هي شريكنا الموثوق لجميع احتياجات التخليص الجمركي. خدماتهم الشاملة التي تغطي الموانئ البحرية والمطارات والمنافذ البرية، بالإضافة إلى دعمهم على مدار الساعة، تجعلهم الخيار المثالي لأي شركة تتعامل مع التجارة الدولية.',
          },
          {
            name: 'محمد عبدالله',
            source: 'مجموعة عبدالله للتصنيع',
            review: 'منذ الشراكة مع الخطوط الآمنة، شهدنا تحسينات ملحوظة في كفاءة سلسلة التوريد لدينا. خبرتهم في استخراج شهادات سابر وتسجيل المنتجات في الهيئة العامة للغذاء والدواء سهلت عملية تسجيل منتجاتنا بشكل كبير.',
          },
        ],
      },
      makingEasy: {
        title: 'نجعل المستقبل سهلاً',
        quote: 'نعرف مشاكلك. نعرف جمهورك المستهدف وكيف يمكنك النمو بسرعة بمساعدة الأتمتة',
        quoteAuthor: 'المؤسس المشارك في landerOS',
        jobOpenings: 'تحقق من جميع الوظائف الشاغرة',
        contact: 'اتصل بالمبيعات الآن',
      },
      strategy: {
        title: 'الإستراتيجية وإنشاء المحتوى',
        before: 'قبل',
        after: 'بعد',
        metrics: [
          { label: 'النمو', beforeLabel: '+10%', afterLabel: '+250%' },
          { label: 'الكفاءة', beforeLabel: '-50%', afterLabel: '+200%' },
          { label: 'التكلفة', beforeLabel: '+100%', afterLabel: '-100%' },
        ],
        bookCall: 'احجز مكالمة مجانية الآن',
        contact: 'اتصل بالمبيعات الآن',
      },
      community: {
        tag: 'المجتمع',
        title: 'تحقق من مجتمعنا',
        subtitle: 'شارك في مجموعة Instagram الخاصة بنا للتواصل مع أفراد آخرين. هنا، أنت مدعو للاستفسار والمناقشة وفتح طلبات الدعم.',
        socials: 'وسائل التواصل:',
        cards: [
          {
            id: 'instagram',
            title: 'Instagram',
            description: 'انضم إلى Instagram الخاص بنا وتواصل مع منشئي وسائل التواصل الاجتماعي والهواة، وشارك الأفكار، ونم معًا.',
            stats: ['15k عضو', 'المجتمع'],
          },
          {
            id: 'twitter',
            title: 'إكس (تويتر)',
            description: 'انضم إلينا على منصة إكس (تويتر) لمتابعة تحديثاتنا، والأدلة المتخصصة، والنقاشات مع شركائنا في المجال.',
            stats: ['25k متابع', 'المجتمع'],
          },
          {
            id: 'tiktok',
            title: 'TikTok',
            description: 'تابعنا على TikTok لمشاهدة مقاطع من خلف الكواليس، ونصائح التخليص الجمركي، وملخصات سريعة.',
            stats: ['40k مشاهدة شهرية', 'أبرز اللقطات'],
          },
          {
            id: 'facebook',
            title: 'Facebook',
            description: 'كن جزءًا من مجموعة Facebook الخاصة بنا لطرح الأسئلة، والتعاون في الشحنات، والحصول على دعم الأقران.',
            stats: ['10k عضو', 'النقاشات'],
          },
          {
            id: 'snapchat',
            title: 'Snapchat',
            description: 'أضفنا على Snapchat للحصول على تحديثات فورية، وإعلانات عاجلة، وقصص ميدانية عن الشحن.',
            stats: ['8k أصدقاء', 'القصص'],
          },
          {
            id: 'whatsapp',
            title: 'واتساب',
            description: 'تواصل معنا عبر واتساب للحصول على إجابات سريعة حول الشحن واستفسارات الأسعار والتحديثات اللحظية.',
            stats: ['دعم مباشر', 'متاح 24/7'],
          },
        ],
      },
    },
  },
};

