<template>
  <v-app id="inspire" dark>
    <v-toolbar fixed app>
      <v-toolbar-title>Particle Simulator</v-toolbar-title>
    </v-toolbar>
    <v-content>

      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 md8>
            <div class="ParticleView" ref="root"
              @mousemove="onMouseMove"
              @mouseleave="onMouseLeave"
            ></div>
          </v-flex>
          <v-flex xs12 md4>
            <v-card class="card--flex-toolbar">
              <v-toolbar card prominent>
                <v-toolbar-title class="body-2 grey--text">Edit</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>

                <v-list subheader>
                  <v-subheader>alpha</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-slider label="start" thumb-label step="0.1" min="0" max="1" v-model="particle.alpha.start"></v-slider>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-slider label="end" thumb-label step="0.1" min="0" max="1" v-model="particle.alpha.end"></v-slider>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list subheader>
                  <v-subheader>scale</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-slider label="start" thumb-label step="0.1" min="0" max="10" v-model="particle.scale.start"></v-slider>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-slider label="end" thumb-label step="0.1" min="0" max="10" v-model="particle.scale.end"></v-slider>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list subheader>
                  <v-subheader>start rotation</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-slider label="min" thumb-label step="1" min="0" max="360" v-model="particle.startRotation.min"></v-slider>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-slider label="max" thumb-label step="1" min="0" max="360" v-model="particle.startRotation.max"></v-slider>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list subheader>
                  <v-subheader>speed</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-slider label="start" thumb-label step="1" min="0" max="200" v-model="particle.speed.start"></v-slider>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-slider label="end" thumb-label step="1" min="0" max="200" v-model="particle.speed.end"></v-slider>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list subheader>
                  <v-subheader>lifetime</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-slider label="min" thumb-label step="0.1" min="0" max="10" v-model="particle.lifetime.min"></v-slider>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-slider label="max" thumb-label step="0.1" min="0" max="10" v-model="particle.lifetime.max"></v-slider>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list subheader>
                  <v-subheader>particle image</v-subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-select
                        :items="imageOptions"
                        v-model="particleImageUrl"
                        label="Select"
                        single-line
                        bottom
                      ></v-select>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>

              </v-card-text>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>

    </v-content>
  </v-app>
</template>

<script src="./script.js"></script>
<style src="../../../node_modules/vuetify/dist/vuetify.min.css"></style>
<style>
.ParticleView {
  position: sticky;
  top: 70px;
}
.ParticleView canvas {
  width: 100%;
}
</style>
