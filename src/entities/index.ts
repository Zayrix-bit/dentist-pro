/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: appointmentrequests
 * Interface for AppointmentRequests
 */
export interface AppointmentRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  patientName?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType date */
  preferredAppointmentDate?: Date | string;
  /** @wixFieldType text */
  treatmentType?: string;
  /** @wixFieldType text */
  message?: string;
}


/**
 * Collection ID: clinicgallery
 * Interface for ClinicGallery
 */
export interface ClinicGallery {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  altText?: string;
}


/**
 * Collection ID: dentalservices
 * Interface for DentalServices
 */
export interface DentalServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceIcon?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType url */
  learnMoreLink?: string;
  /** @wixFieldType text */
  longDescription?: string;
}


/**
 * Collection ID: dentists
 * Interface for Dentists
 */
export interface Dentists {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  qualifications?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
  /** @wixFieldType text */
  patientCarePhilosophy?: string;
  /** @wixFieldType text */
  highlights?: string;
}


/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  patientName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  patientPhoto?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType text */
  reviewText?: string;
  /** @wixFieldType datetime */
  reviewDate?: Date | string;
}
