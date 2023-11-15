<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img alt="Vuetify Logo" class="shrink mr-2" contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
                    width="40" />

                <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
            </div>

            <v-spacer></v-spacer>

            <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
        <footer class="page-footer bg-dark pt-50">
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
                                <img src="https://staging.snipsbasketball.com/storage/general/snips-logo.png" alt="snipsbasketball"
                            height="50">
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
