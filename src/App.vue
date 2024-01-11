<template>
    <v-app>
        <header data-sticky="false" data-sticky-checkpoint="200" data-responsive="991"
            class="page-header page-header--light">
            <!-- <div class="container">
               
                <div class="page-header__left">
                    <a href="/" class="page-logo">
                        <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball"
                            height="50">
                    </a>
                </div>
                <div class="page-header__right">
                    
                    <div class="navigation-toggle navigation-toggle--dark" style="display: none"><span></span></div>
                    <div class="pull-left">
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="super-search hide" data-search-url="https://staging.snipsbasketball.com/ajax/search">
                <form class="quick-search" action="https://staging.snipsbasketball.com/search">
                    <input type="text" name="q" placeholder="Type to search..." class="form-control search-input"
                        autocomplete="off">
                    <span class="close-search">×</span>
                </form>
                <div class="search-result"></div>
            </div> -->
        </header>

        <v-main>
            <router-view />
        </v-main>
        <footer class="page-footer  ">
            <div class="container">
                <div class=" top-footer">
                    <div class="logo-footer">
                        <a href="https://snipssnacks.com/"> <img src="https://app.snipsbasketball.com/storage/general/snips-logo.png"
                                alt="snipsbasketball" height="86"></a>
                        <ul class="social">
                            <a href="https://www.instagram.com/snipsbakedsnacks/" class="social-item"><img src="./assets/img/icon-insta.png"/></a>
                            <a href="https://www.facebook.com/SnipsBakedSnacks" class="social-item"><img src="./assets/img/icon-fb.png"/></a>
                            <a href="https://www.tiktok.com/@snipsbakedsnacks" class="social-item"><img src="./assets/img/icon-tiktok.png"/></a>
                            <a href="https://www.youtube.com/@SnipsBakedSnacks" class="social-item"><img src="./assets/img/icon-yt.png"/></a>
                           
                        </ul>
                    </div>
                    <div class="address">
                        <p>
                            Sin El Fil, Daoud Ammoun St.<br>
                            Qubic Square Business Center<br>
                            13th Floor - Beirut, Lebanon<br>
                            +961 1 495 380<br>
                        </p>
                    </div>
                </div>
            </div>
            <div class="page-footer__bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 col-sm-12">
                            <div class="page-copyright">
                                <ul>
                                    <li><a target="_blank" href="/privacy-policy">PRIVACY POLICY </a></li>
                                    <li><a target="_blank" href="/terms">TERMS & CONDITIONS</a></li>
                                    <li><a target="_blank" href="/cookie">COOKIE PREFERENCES</a></li>
                                    <li class="last">©2023 snipsbasketball. All right reserved.</li>
                                </ul>
                                <div style="text-align: center;">
                                POWERED BY <a target="_blank" href="https://www.mews.agency/">MEWS</a>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </v-app>
</template>

<script >
// @ is an alias to /src



/* import font awesome icon component */
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

//library.add(faTwitter, faFacebook, faInstagram);
// Vue.component('font-awesome-icon', FontAwesomeIcon);



</script>
<style>
.fa-twitter, .fa-facebook, .fa-instagram {
  font-size: 24px;
  margin-right: 10px; /* Adjust as needed */
}
ul.social{
    margin-top: 10px!important;
    margin-bottom: 10px!important;
}
.page-copyright ul{
    margin-bottom: 5px!important;
}
ul.social .social-item img{
    width: 30px;
    padding: 2px;
    margin: 1px;

}
.page-copyright ul {
    /* width: 400px; */
    display: block;
    margin: 0 auto;
}

.page-copyright ul li {
    padding: 5px 3px;
  display: inline-block;
}

li.last {
    width: 300px;
    font-size: 15px;
    line-height: 2.8em;
    font-weight: 500;
}

.page-copyright ul li a {
    font-size: 15px;
    font-weight: 400;
    padding-left: 5px;
    padding-right: 5px;
}
.page-footer{
    background-color: #d1d3d4;
}
.page-footer,
body .page-footer__bottom {
    background-color: #d1d3d4;
}

.page-footer .logo-footer {
    display: inline-block;
    width: 130px;
    vertical-align: top;
}

.page-footer .address {
    width: 290px;
    display: inline-block;
    vertical-align: top;
    padding-left: 20px;
}

.top-footer {
    padding-top: 40px;
    width: 420px;
    margin: 0 auto;
    display: block;
    padding-bottom: 12px;
    margin: 0 auto;
}

.page-footer .address p {
    padding-left: 15px;
    margin-top: 15px;
    margin-bottom: 20px;
    font-weight: 400;
    line-height: 20px;
    font-size: 16px;
}
.page-copyright {
  text-align: center; /* Center the content */
}
.page-footer P {
    color: black;
    margin-top: 8px;
    margin-bottom: 10px;
    line-height: 1.2;
}
body .page-footer__bottom {
    
    padding: 0px 0 5px;}
    body   .page-copyright ul {
    /* width: 400px; */
    margin-top: 0px;}
</style>
