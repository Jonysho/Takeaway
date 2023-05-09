# Takeaway-Website
A website for showing information about a takeaway including its menu, where users will be able to instructed to phone up or order food items online (if they are logged in) and then receive a notification when the food is ready to collect.

### Objectives:
- Create a user-friendly website, responsive to both mobile and desktop users, displaying all the information required
- Allow users to login / signup with their phone no. or as guests
- Allow users to order food items with a cart, perform payments and receive notifications.
- Create a secure database to store user information & menu items
- Test + Optimize application for performance, security and scalability
- Deploy website using a hosting provider

### Installation:
npm i init
frontend: npm i axios react-slick slick-carousel 
backend: npm i express 

### Features / Functionalities:
#### Design 
- [X] Design mockups for visualisation

#### Code up structure of frontend + styling - Sprint 1
- [ ] Create Layout of pages:
    - [X] Header
    - [ ] Footer
- [X] Create all required pages:
    - [X] Home 
    - [X] Favourite Orders 
    - [X] Saved Dishes
    - [X] Account settings page
    - [X] Change Password
    - [X] Login / Register / Forget Password
- [X] Buttons for Log in / Register, Shopping cart
- [X] Navbar to traverse the page

#### User Authentication & Authorization - Sprint 2
- [X] Add/Update users
- [X] Add all validation checks for fields
- [X] User registration/login
- [X] User Sessions (remain authenticated as they navigate) + Logout
- [X] User profile - reset passwords / change details
- [X] Phone / Email Verification (For creating accounts & changing details)
    - [X] Email
    - [ ] Phone (Maybe)
- [X] OAuth Login - Login with social media e.g. Google/FB
    - [X] Google
    - [ ] Facebook (to do later)

#### Menu display - Sprint 3
- [ ] Admin users
    - [X] Implement isAdmin property for user accounts
    - [ ] Add isAdmin function to authContext to protect pages (frontend)
    - [X] Add requireAdminAuth middleware to protect admin Routes 
    - [ ] Create admin dashboard for functionalities:
        - [ ] get all users, delete users
        - [ ] Create/Update/Delete menu items
        - [ ] Upload of images for menu card
- [X] Menu Schema
- [X] Menu controller functions
    - [X] Create, Read, Update, Delete
- [ ] Create menu display cards
- [ ] Finish menu page
    - [ ] Fetch all menu items and display all
    - [ ] Add filter section 

#### Shopping Cart functionality
- [ ] Add Cart array for User documents
- [ ] Create/Read/Update Cart array (using Menu Item IDs)
- [ ] Calculate price using IDs and Menu Prices
- [ ] Update (Read) price on frontend
- [ ] Cart dropdown

#### To do later:
#### Online Ordering System
#### Payment processing system

#### Finish Admin Dashboard
- [ ] Dashboard
- [ ] Current active orders (mark as complete, update order status)
- [ ] Income (charts, recent orders, filter by days etc.)

#### Real-time order tracking system (track status of orders from kitchen to delivery)


#### Customer reviews / ratings system