# E-Commerce Application

* Render link: https://e-commerce-application-zjqa.onrender.com

* Page structure:
  * Pages can be accessed from navbar. According to the authentication, available pages changes.
  * HomePage 
    * Every item is listed in this page. Listed items can be filtered according to the categories
    * anyone can access this page without authentication (as regular user or admin)
    * if user is authenticated as regular user, user can review and rate the listed items. If user is already review or rated a item, it can be seen on the item basis and can overwrite just by re-rating or re-reviewing item.
    * src/pages/index.js 
    * https://e-commerce-application-zjqa.onrender.com
  * User Page
    * User's average rating and reviews are displayed in this page
    * Only regular users can access this page
    * src/pages/UserPage.js 
    * https://e-commerce-application-zjqa.onrender.com/UserPage
  * Admin Page 
    * Every admin operation (user adding, user removing , item adding, item removing) is displayed in this page 
    * Only admin can access this page
    * src/pages/AdminPage.js 
    * https://e-commerce-application-zjqa.onrender.com/AdminPage


* Authentication:
  * On top right corner of the website, there is a login section
  * As Regular User:
    * Just enter username
    * Currently available regular users:
      * username: user_1
      * username: user_2
      * username: user_3
  * As Admin:
    * Enter both username and password
    * only available admin user is:
      * username: admin
      * password: admin


* Important details: 
  * There is no need to reload page after any interaction, page content automatically updates itself. Refreshing the page logouts the current user. 
  * According to the screen ratio, sometimes images could not be seen. Hyperlink is used, image can be observed by clicking to the empty space where the image should be.


* Database Structure: 
  * users collection:
    * username
    * password [optional]
    * isAdmin
  * item collection:
    * name
    * description
    * price
    * seller
    * image
    * category
    * size [optional]
    * colour [optional]
    * spec [optional]
  * rating collection:
    * username
    * itemId
    * rating
  * review collection:
    * username
    * itemId
    * review
  * Separating rating and review collections seemed more logical to me because rewriting a item document for each rating and review addition/deletion/change (or user document) felt like not a good practice especially if item (or user) is large. And also I wanted to use aggregation framework.


* Used frameworks:
  * Next.js is used for both frontend and backend operations. why:
    * I already know react library for frontend development and wanted to learn next.js framework for fullstack application development
  * Tailwind css framework is used for styling frontend. why:
    * Easy to set up and use
* Used programming language:
  * javascript. why:
    * react is a javascript library.
