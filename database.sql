--CREATE DATABASE mn-marketing-careers

CREATE TABLE "job_postings" (
	"id" serial NOT NULL,
	"company_id" integer NOT NULL,
	"available_role" varchar(500) NOT NULL,
	"description" varchar(500),
	"application_link" varchar(500) NOT NULL,
	"job_city" varchar(255) NOT NULL,
	"job_state" varchar(255) NOT NULL,
	"remote" varchar(255) NOT NULL DEFAULT 'no',
	"date_posted" DATE NOT NULL DEFAULT CURRENT_DATE,
	"posting_contact_id" integer NOT NULL,
	"share_contact" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"hiring_contact_id" integer,
	"user_id" integer NOT NULL DEFAULT '0',
	"status" varchar(255) NOT NULL DEFAULT 'PENDING_APPROVAL',
	"archived" BOOLEAN NOT NULL DEFAULT 'FALSE',
	CONSTRAINT "job_postings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user" (
	"id" serial NOT NULL,
	"email" varchar(1000) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"first_name" varchar(500) NOT NULL,
	"last_name" varchar(255),
	"access_level" integer NOT NULL DEFAULT '0',
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hiring_contact" (
	"id" serial NOT NULL,
	"hiring_contact_name" varchar(255),
	"hiring_contact_email" varchar(255) UNIQUE,
	"title" varchar(500),
	"phone" varchar(255),
	CONSTRAINT "hiring_contact_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "job_types" (
	"id" serial NOT NULL,
	"type" varchar(500) NOT NULL,
	CONSTRAINT "job_types_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "company" (
	"id" serial NOT NULL,
	"company_name" varchar(500) NOT NULL,
	CONSTRAINT "company_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "jobs_by_type" (
	"id" serial NOT NULL,
	"job_posting_id" integer NOT NULL,
	"job_type_id" integer NOT NULL,
	CONSTRAINT "jobs_by_type_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "issues" (
	"id" serial NOT NULL,
	"job_posting_id" integer NOT NULL,
	"comment" varchar(500),
	"issue_type" varchar(500) NOT NULL,
	"date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"status" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"issues_email" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "issues_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "feedback" (
	"id" serial NOT NULL,
	"reason" varchar(1000) NOT NULL,
	"message" varchar(1000),
	"archived" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"date_received" DATE NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT "feedback_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posting_contact" (
	"id" serial NOT NULL,
	"posting_contact_name" varchar(255) NOT NULL,
	"posting_contact_email" varchar(500) NOT NULL UNIQUE,
	CONSTRAINT "posting_contact_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_fk0" FOREIGN KEY ("company_id") REFERENCES "company"("id");
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_fk1" FOREIGN KEY ("posting_contact_id") REFERENCES "posting_contact"("id");
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_fk2" FOREIGN KEY ("hiring_contact_id") REFERENCES "hiring_contact"("id");
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_fk3" FOREIGN KEY ("user_id") REFERENCES "user"("id");





ALTER TABLE "jobs_by_type" ADD CONSTRAINT "jobs_by_type_fk0" FOREIGN KEY ("job_posting_id") REFERENCES "job_postings"("id");
ALTER TABLE "jobs_by_type" ADD CONSTRAINT "jobs_by_type_fk1" FOREIGN KEY ("job_type_id") REFERENCES "job_types"("id");

ALTER TABLE "issues" ADD CONSTRAINT "issues_fk0" FOREIGN KEY ("job_posting_id") REFERENCES "job_postings"("id");



INSERT INTO "job_types" ("type") VALUES 
	('Account Management'),
	('Advertising'),
	('Branding'),
	('Communications'),
	('Copywriting'),
	('Digital Media'),
	('Graphic Design'),
	('Marketing'),
	('Public Relations'),
	('Social Media'),
	('Editorial'),
	('Ecommerce'),
	('Project Management'),
	('Internship');


SELECT "", "status", "archived", "hiring_contact_id" FROM "job_postings"
JOIN ;
