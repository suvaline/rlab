# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150729102924) do

  create_table "bookings", force: :cascade do |t|
    t.datetime "start"
    t.integer  "step",       limit: 4
    t.integer  "lab_id",     limit: 4
    t.integer  "user_id",    limit: 4
    t.integer  "group_id",   limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  add_index "bookings", ["group_id"], name: "index_bookings_on_group_id", using: :btree
  add_index "bookings", ["lab_id"], name: "index_bookings_on_lab_id", using: :btree
  add_index "bookings", ["user_id"], name: "index_bookings_on_user_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.string   "description",     limit: 255
    t.string   "password_digest", limit: 255
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "groups_labs", force: :cascade do |t|
    t.integer "group_id", limit: 4
    t.integer "lab_id",   limit: 4
  end

  create_table "groups_users", force: :cascade do |t|
    t.integer "group_id", limit: 4
    t.integer "user_id",  limit: 4
  end

  create_table "instructors", force: :cascade do |t|
    t.integer "user_id", limit: 4
    t.integer "lab_id",  limit: 4
  end

  create_table "lab_sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lab_settings", force: :cascade do |t|
    t.integer  "lab_id",           limit: 4
    t.integer  "max_steps",        limit: 4
    t.integer  "total_steps",      limit: 4
    t.integer  "step_length",      limit: 4
    t.string   "extra_properties", limit: 255
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "lab_settings", ["lab_id"], name: "index_lab_settings_on_lab_id", using: :btree

  create_table "labs", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.string   "password_digest", limit: 255
    t.integer  "mingroup",        limit: 4
    t.integer  "maxgroup",        limit: 4
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "labs_users", force: :cascade do |t|
    t.integer "lab_id",  limit: 4
    t.integer "user_id", limit: 4
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",      limit: 255
    t.string   "last_name",       limit: 255
    t.string   "info",            limit: 255
    t.string   "email",           limit: 255
    t.string   "password_digest", limit: 255
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_foreign_key "bookings", "groups"
  add_foreign_key "bookings", "labs"
  add_foreign_key "bookings", "users"
  add_foreign_key "lab_settings", "labs"
end
