<template>
    <v-card>
        <v-card-title>
            <span class="title">{{ player.name }}</span>
            <v-spacer />
            <v-btn icon close @click="$emit('cancel')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-tabs>
                <v-tab>Round 1</v-tab>
                <v-tab>Round 2</v-tab>
                <v-tab>Round 3</v-tab>
                <v-tab>Round 4</v-tab>
                
                <v-tab-item v-for="(round, index) in rounds" :key="index">
                    <v-simple-table>
                        <template slot:default>
                            <thead>
                                <tr>
                                    <th>Hole</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(score, holeIndex) in round.scores" :key="`hole-${holeIndex+1}`">
                                    <td>{{ holeIndex + 1 }}</td>
                                    <td>{{ score }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props: ['player'],
    computed: {
        rounds() {
            return [this.player.round1, this.player.round2, this.player.round3, this.player.round4];
        }
    }
}
</script>