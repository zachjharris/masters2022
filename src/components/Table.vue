<template>
<v-container>
    <!--
    <v-row mx-0>
        <v-spacer />
        <v-btn @click="display = display == 'card' ? 'table' : 'card'" elevation="1" class="no-border-l">
            <v-icon v-text="display == 'card' ? 'mdi-view-headline' : 'mdi-view-module'"></v-icon>
        </v-btn>
    </v-row>
    -->
    <v-card v-if="display == 'table'" class="mt-2">
        <v-data-table :items="users" :headers="headers" 
            hide-default-footer 
            disable-pagination
            sort-by="topar"
            mobile-breakpoint="0"
            v-if="display == 'table'"
        >
            <template v-slot:body="{ items }">
                <tbody>
                    <template v-for="(user, index) in items"> 
                        <tr :key="`${user.name}-${index}`" v-if="user.picks[0] != null">
                            <td>{{ user.name }}</td>
                            <td class="text-center">{{ user.today > 0 ? '+' + user.today : user.today == '0' ? 'E' : user.today }}</td>
                            <template v-for="(pick, pickIndex) in user.picks">
                                <td :key="`${user.name}-${index}-${pickIndex}`" @click="viewPlayer(pick)">
                                    <template v-if="pick != null">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on" :class="{'text-decoration-line-through': pick.index> 500 }">
                                                    {{ pick.first_name + ' ' + pick.last_name }}<br />
                                                    <v-chip x-small v-if="pick.pos != '' && pick.topar != ''">{{ pick.pos }}: {{ pick.topar }}</v-chip>
                                                </span>
                                            </template>
                                            <div v-if="pick.pos != '' && pick.today != '' && pick.thru != ''">
                                                Position: {{ pick.pos }}<br />
                                                Today: {{ pick.today }}<br />
                                                Thru: {{ pick.thru }}
                                            </div>
                                            <div v-else>
                                                Tee Time: {{ pick.teetime }}
                                            </div>
                                        </v-tooltip>
                                    </template>
                                </td>
                            </template>
                            <td class="text-center">{{ user.topar }}</td>
                        </tr>
                    </template>
                </tbody>
            </template>
        </v-data-table>
    </v-card>
    <v-data-iterator :items="users" v-if="display == 'card'"
        sort-by="topar"
        disable-pagination
        hide-default-footer>
        <template v-slot:default="{ items }">
            <v-row mx-0 wrap>
                <v-col cols="12" sm="6" md="4" v-for="(user, index) in items" :key="`card-${user.name}-${index}`">
                    <v-card>
                        <v-card-title>{{ user.name }}</v-card-title>
                        <v-card-text>
                            <v-row mx-0 wrap>
                                <v-chip class="mx-2">Today: {{ user.today }}</v-chip>
                                <v-chip class="mx-2">Total: {{ user.topar }}</v-chip>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </v-data-iterator>
    <v-dialog v-if="showPlayer" v-model="showPlayer" max-width="600">
        <player :pars="pars" :player="player" @cancel="showPlayer = false" />
    </v-dialog>
</v-container>
</template>
<script>
import Player from './Player';
export default {
    props: ['users', 'pars'],
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
                {text: 'Name', value: 'name', width:'160'},
                {text: 'Today', value: 'today', align: 'center'},
                {text: 'Golfer 1', value: 'picks[0].name', width: '170'},
                {text: 'Golfer 2', value: 'picks[1].name', width: '170'},
                {text: 'Golfer 3', value: 'picks[2].name', width: '170'},
                {text: 'Golfer 4', value: 'picks[3].name', width: '170'},
                {text: 'Golfer 5', value: 'picks[4].name', width: '170'},
                {text: 'Golfer 6', value: 'picks[5].name', width: '170'},
                {text: 'Total', value: 'topar', align: 'center', width: '100'},
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