-- CreateEnum
CREATE TYPE "FlowStatus" AS ENUM ('INACTIVE', 'TEST', 'ACTIVE');

-- CreateEnum
CREATE TYPE "DeletionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "facebook_id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "picture" TEXT,
    "gemini_api_key" TEXT,
    "subscription_tier" TEXT NOT NULL DEFAULT 'free',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instagram_accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "instagram_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "profile_picture_url" TEXT,
    "followers_count" INTEGER,
    "access_token" TEXT NOT NULL,
    "token_expires_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instagram_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "automation_flows" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "instagram_account_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "FlowStatus" NOT NULL DEFAULT 'INACTIVE',
    "trigger_keywords" TEXT[],
    "trigger_exact_match" BOOLEAN NOT NULL DEFAULT false,
    "test_users" TEXT[],
    "nodes" JSONB NOT NULL,
    "edges" JSONB NOT NULL,
    "follower_only" BOOLEAN NOT NULL DEFAULT false,
    "daily_quota" INTEGER NOT NULL DEFAULT 100,
    "used_quota" INTEGER NOT NULL DEFAULT 0,
    "quota_reset_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "automation_flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dm_sessions" (
    "id" TEXT NOT NULL,
    "automation_flow_id" TEXT NOT NULL,
    "instagram_account_id" TEXT NOT NULL,
    "instagram_user_id" TEXT NOT NULL,
    "instagram_username" TEXT,
    "current_node_id" TEXT,
    "session_state" JSONB NOT NULL DEFAULT '{}',
    "user_images" TEXT[],
    "generated_images" TEXT[],
    "last_message_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dm_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_prompt_templates" (
    "id" TEXT NOT NULL,
    "template_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "analysis_model_normal" TEXT NOT NULL DEFAULT 'gemini-2.0-flash-lite',
    "analysis_model_high" TEXT NOT NULL DEFAULT 'gemini-2.0-flash-lite',
    "edit_model_normal" TEXT NOT NULL DEFAULT 'gemini-2.0-flash-image-preview',
    "edit_model_high" TEXT NOT NULL DEFAULT 'gemini-2.5-flash-image-preview',
    "analysis_prompt" TEXT NOT NULL,
    "edit_template" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_prompt_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "event_type" TEXT NOT NULL,
    "session_id" TEXT,
    "details" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deletion_requests" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "confirmation_code" TEXT NOT NULL,
    "status" "DeletionStatus" NOT NULL DEFAULT 'PENDING',
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "deletion_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_facebook_id_key" ON "users"("facebook_id");

-- CreateIndex
CREATE UNIQUE INDEX "instagram_accounts_instagram_id_key" ON "instagram_accounts"("instagram_id");

-- CreateIndex
CREATE INDEX "instagram_accounts_user_id_idx" ON "instagram_accounts"("user_id");

-- CreateIndex
CREATE INDEX "automation_flows_instagram_account_id_status_idx" ON "automation_flows"("instagram_account_id", "status");

-- CreateIndex
CREATE INDEX "automation_flows_user_id_idx" ON "automation_flows"("user_id");

-- CreateIndex
CREATE INDEX "dm_sessions_automation_flow_id_idx" ON "dm_sessions"("automation_flow_id");

-- CreateIndex
CREATE INDEX "dm_sessions_instagram_user_id_idx" ON "dm_sessions"("instagram_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "dm_sessions_instagram_account_id_instagram_user_id_automati_key" ON "dm_sessions"("instagram_account_id", "instagram_user_id", "automation_flow_id");

-- CreateIndex
CREATE UNIQUE INDEX "ai_prompt_templates_template_type_key" ON "ai_prompt_templates"("template_type");

-- CreateIndex
CREATE INDEX "events_user_id_created_at_idx" ON "events"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "events_event_type_created_at_idx" ON "events"("event_type", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "deletion_requests_confirmation_code_key" ON "deletion_requests"("confirmation_code");

-- CreateIndex
CREATE INDEX "deletion_requests_confirmation_code_idx" ON "deletion_requests"("confirmation_code");

-- AddForeignKey
ALTER TABLE "instagram_accounts" ADD CONSTRAINT "instagram_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_flows" ADD CONSTRAINT "automation_flows_instagram_account_id_fkey" FOREIGN KEY ("instagram_account_id") REFERENCES "instagram_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "automation_flows" ADD CONSTRAINT "automation_flows_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "ai_prompt_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dm_sessions" ADD CONSTRAINT "dm_sessions_automation_flow_id_fkey" FOREIGN KEY ("automation_flow_id") REFERENCES "automation_flows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dm_sessions" ADD CONSTRAINT "dm_sessions_instagram_account_id_fkey" FOREIGN KEY ("instagram_account_id") REFERENCES "instagram_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deletion_requests" ADD CONSTRAINT "deletion_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
