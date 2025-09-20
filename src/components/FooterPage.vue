
<script>
export default {

  methods: {

    scrollTo(id){
      const section=document.getElementById(id);
      if (section) section.scrollIntoView({behavior: 'smooth'});
    }
  }
}
</script>

<template>
  <section id="footer">
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-about">
        <img src="@/assets/celvelogo.jpeg" alt="Logo" class="logo-img" />
          <h4>Celve</h4>
          <p style="color: orange;">
            Empower Voters. Inspire Leaders. Sustain Democracy.
          </p>
        </div>

        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#" @click.prevent="scrollTo('home')">Home</a></li>
            <li><a href="#" @click.prevent="scrollTo('about')">About</a></li>
            <li><a href="#" @click.prevent="scrollTo('program')">Programs</a></li>
            <li><router-link to="/register">Get Started</router-link></li>
            
          </ul>
        </div>

        <div class="footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="mailto:info@celve.com">celve.org@gmail.com</a></li>
            <li><a href="tel:+254712254000">+254 732406245</a></li>
            </ul>
        </div>

        <div class="footer-social">
          <h4>Stay Connected</h4>
          <a href="#" aria-label="Visit our Twitter page"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
          <a href="#" aria-label="Visit our Facebook page"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          <a href="#" aria-label="Visit our LinkedIn page"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="#" aria-label="Visit our Instagram page"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Celve. All Rights Reserved.</p>
        <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  </section>
</template>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


.site-footer {
    background-color: #2c3e50;
    color: #bdc3c7; 
    padding: 45px 0 20px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 15px;
    line-height: 24px;
}

.footer-container {
    max-width: 1170px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 15px;
}

.logo-img {
  height: 40px;
  width: 40px;
  object-fit: contain;
}

.site-footer h4 {
    color: #ecf0f1; 
    text-transform: uppercase;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.footer-about, .footer-links, .footer-contact, .footer-social {
    width: 100%; 
    margin-bottom: 30px;
}

@media (min-width: 768px) {
    .footer-about, .footer-links, .footer-contact {
        width: 22%;
    }
    .footer-social {
        width: 22%;
    }
}

@media (min-width: 992px) {
    .footer-about {
        width: 30%;
    }
    .footer-links, .footer-contact {
        width: 20%;
    }
    .footer-social {
        width: 20%;
    }
}

.site-footer p {
    color: #bdc3c7;
}

.site-footer a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
}

.site-footer a:hover {
    color: #3498db; 
}

.footer-links ul, .footer-contact ul {
    list-style: none;
    padding-left: 0;
}

.footer-links ul li:not(:last-child),
.footer-contact ul li:not(:last-child) {
    margin-bottom: 10px;
}


.footer-social a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #34495e; 
    color: #ecf0f1;
    transition: background-color 0.3s ease-in-out;
}

.footer-social a:hover {
    background-color: #3498db;
    color: #fff;
}

.footer-social a svg {
    width: 20px;
    height: 20px;
}


.footer-bottom {
    border-top: 1px solid #34495e;
    margin-top: 30px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1170px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
}

.footer-bottom p {
    margin: 0;
    font-size: 14px;
}

.footer-bottom div a {
    margin-left: 20px;
    font-size: 14px;
}

@media (max-width: 767px) {
    .footer-bottom {
        flex-direction: column;
        text-align: center;
    }
    .footer-bottom p {
        margin-bottom: 10px;
    }
    .footer-bottom div {
        margin-top: 10px;
    }
    .footer-bottom div a {
        margin: 0 10px;
    }
}
</style>
