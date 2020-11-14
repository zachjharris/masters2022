<template>
<v-container>
    <v-card class="mt-2">
        <v-data-table :items="picks" :headers="headers" 
            hide-default-footer 
            disable-pagination
            sort-by="topar"
            mobile-breakpoint="0"
        >
            <template v-slot:body="{ items }">
                <tbody>
                    <template v-for="(pick) in items"> 
                        <tr v-if="pick.name != null" :key="`${pick.id}`">
                            <td @click="viewPlayer(pick)">
                                <span :class="{'text-decoration-line-through': pick.index> 50 }">{{ pick.name }}</span>
                            </td>
                            <td class="text-center">{{ pick.topar }}</td>
                            <td class="text-center">{{ pick.today == '' ? pick.teetime : pick.today }}</td>
                            <td class="text-center">{{ pick.round1Total > 0 ? '+' + pick.round1Total : pick.round1Total == 0 ? 'E' : pick.round1Total }} ({{ pick.round1.roundStatus }})</td>
                            <td class="text-center">{{ pick.round2Total > 0 ? '+' + pick.round2Total : pick.round2Total == 0 ? 'E' : pick.round2Total }} ({{ pick.round2.roundStatus }})</td>
                            <td class="text-center">{{ pick.round3Total > 0 ? '+' + pick.round3Total : pick.round3Total == 0 ? 'E' : pick.round3Total }} ({{ (pick.thru != '' && pick.round3.roundStatus == 'Playing') ? 'Thru: ' + pick.thru : pick.round3.roundStatus }})</td>
                            <td class="text-center">{{ pick.round4Total > 0 ? '+' + pick.round4Total : pick.round4Total == 0 ? 'E' : pick.round4Total }} ({{ (pick.thru != '' && pick.round4.roundStatus == 'Playing') ? 'Thru: ' + pick.thru : pick.round4.roundStatus }})</td>
                        </tr>
                    </template>
                </tbody>
            </template>
        </v-data-table>
    </v-card>
    <v-dialog v-if="showPlayer" v-model="showPlayer" max-width="600">
        <player :pars="pars" :player="player" />
    </v-dialog>
</v-container>
</template>
<script>
import Player from './Player';
export default {
    props: ['picks', 'pars'],
    components: {
        Player
    },
    data() {
        return {
            display: 'table',
            showPlayer: false,
            player: {},
            search: '',
            headers: [
                {text: 'Name', value: 'name', width:'175'},
                {text: 'Total', value: 'topar', align: 'center'},
                {text: 'Today', value: 'today', align: 'center', width: '80'},
                {text: 'Round 1', value: 'round1Total', align: 'center'},
                {text: 'Round 2', value: 'round2Total', align: 'center'},
                {text: 'Round 3', value: 'round3Total', align: 'center'},
                {text: 'Round 4', value: 'round4Total', align: 'center'}
            ]
        }
    },
    methods: {
        viewPlayer(player) {
            this.player = player;
            this.showPlayer = true;
        }
    }
}
</script>