<template>
    <v-app>
        <header data-sticky="false" data-sticky-checkpoint="200" data-responsive="991"
            class="page-header page-header--light">
            <div class="container">
                <!-- LOGO-->
                <div class="page-header__left">
                    <a href="/" class="page-logo">
                        <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball"
                            height="50">
                    </a>
                </div>
                <div class="page-header__right">
                    <!-- MOBILE MENU-->
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
            </div>
        </header>

        <v-main>
            <router-view />
        </v-main>
        <footer class="page-footer bg-dark ">
            <!-- <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                        <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball"
                            height="150">
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6 col-12">
                        <aside class="widget widget--transparent widget__footer widget__about">
                            <div class="widget__header">
                                <h3 class="widget__title">About us</h3>
                            </div>
                            <div class="widget__content">
                                <p>We're working on something awesome! Stay tuned for our basketball updates.</p>
                                <div class="person-detail">
                                    <p><i class="ion-home"></i>Ferzol, Global Snacks Factory Zahle District, Lebanon</p>
                                    <p><i class="ion-earth"></i><a
                                            href="https://snipsbasketball.com">https://snipsbasketball.com</a></p>
                                    <p><i class="ion-email"></i><a
                                            href="mailto:info@snipsbasketball.com">info@snipsbasketball.com</a></p>
                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </div> -->
            <div class="page-footer__bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-sm-6">
                            <div class="page-copyright">
                                <p>©2023 snipsbasketball. All right reserved.</p>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class="page-footer__social">
                                <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png"
                                    alt="snipsbasketball" height="50">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </v-app>
</template>

<script setup>
</script>
