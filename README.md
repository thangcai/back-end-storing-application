# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and do follow the steps below

## Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Run App

### 1. Install Postgresql

Download postgresql from "https://www.postgresql.org/download/"
Install and setup User

### 2. Config file .env follow your credentials

### 3. Install package

Install NodeJs and Yarn
Run 'yarn' to install package

### 4. Run migrate DB

Run 'db-migrate up' to create database

### 5. Run App

Run 'yarn watch' to run application on local

### 6. Run Test

Run 'yarn test' to run all test case

## API Endpoints

#### Products

GET - "/products"
GET - "/products/:id"
GET - "/products/category/:category"
POST - "/products"
DELETE - "/products/:id"

#### Users

GET - "/users"
GET - "/users/:id"
POST - "/users"
POST - "/users/logIn"
DELETE - "/users/:id"

#### Orders

GET - "/orders/complete/:userId"
GET - "/orders/:userId"
POST - "/orders"
