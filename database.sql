--CREATE DATABASE mn-marketing-careers
 
CREATE TABLE "user" (
	"id" serial PRIMARY KEY,
	"email" varchar(1000) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"first_name" varchar(500) NOT NULL,
	"last_name" varchar(255),
	"access_level" integer NOT NULL DEFAULT '0'
);

  

CREATE TABLE "company" (
	"id" serial PRIMARY KEY,
	"company_name" varchar(500) UNIQUE NOT NULL
);


CREATE TABLE "job_types" (
	"id" serial PRIMARY KEY,
	"type" varchar(500) UNIQUE NOT NULL
);


CREATE TABLE "hiring_contact" (
	"id" serial PRIMARY KEY,
	"hiring_contact_name" varchar(255),
	"hiring_contact_email" varchar(255) UNIQUE,
	"title" varchar(500),
	"phone" varchar(255)
);


CREATE TABLE "posting_contact" (
	"id" serial PRIMARY KEY,
	"posting_contact_name" varchar(255) NOT NULL,
	"posting_contact_email" varchar(500) NOT NULL UNIQUE
);


CREATE TABLE "job_postings" (
	"id" serial PRIMARY KEY,
	"company_id" INT NOT NULL REFERENCES "company" ON DELETE CASCADE ON UPDATE CASCADE,
	"available_role" varchar(500) NOT NULL,
	"description" TEXT,
	"application_link" varchar(1000) NOT NULL,
	"job_city" varchar(255) NOT NULL,
	"job_state" varchar(255) NOT NULL,
	"remote" varchar(255) NOT NULL DEFAULT 'no',
	"date_posted" DATE NOT NULL DEFAULT CURRENT_DATE,
	"posting_contact_id" INT NOT NULL REFERENCES "posting_contact" ON DELETE CASCADE ON UPDATE CASCADE,
	"share_contact" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"hiring_contact_id" INT REFERENCES "hiring_contact" ON DELETE CASCADE ON UPDATE CASCADE,
	"user_id" INT REFERENCES "user",
	"status" varchar(255) NOT NULL DEFAULT 'PENDING_APPROVAL',
	"archived" BOOLEAN NOT NULL DEFAULT 'FALSE'
);


CREATE TABLE "jobs_by_type" (
	"id" serial PRIMARY KEY,
	"job_posting_id" INT NOT NULL REFERENCES "job_postings" ON DELETE CASCADE ON UPDATE CASCADE,
	"job_type_id" INT NOT NULL REFERENCES "job_types" ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE "issues" (
	"id" serial PRIMARY KEY,
	"job_posting_id" INT NOT NULL REFERENCES "job_postings" ON DELETE CASCADE ON UPDATE CASCADE,
	"comment" varchar(1000),
	"issue_type" varchar(500) NOT NULL,
	"date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"is_resolved" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"issues_email" varchar(255) NOT NULL
);


CREATE TABLE "feedback" (
	"id" serial PRIMARY KEY,
	"reason" varchar(1000) NOT NULL,
	"message" varchar(1000),
	"archived" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"date_received" DATE NOT NULL DEFAULT CURRENT_DATE
);



INSERT INTO "job_types" ("type") VALUES 
	(' Account Management'),
	(' Advertising'),
	(' Branding'),
	(' Communications'),
	(' Copywriting'),
	(' Digital Media'),
	(' Graphic Design'),
	(' Marketing'),
	(' Public Relations'),
	(' Social Media'),
	(' Editorial'),
	(' Ecommerce'),
	(' Project Management'),
	(' Internship');


