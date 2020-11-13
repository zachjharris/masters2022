<template>
    <v-data-table :items="users" :headers="headers" 
        hide-default-footer 
        disable-pagination
        sort-by="totalStrokes"
        mobile-breakpoint="0"
    >
        <template v-slot:body="{ items }">
            <tbody>
                <template v-for="(user, index) in items"> 
                    <tr :key="`${user.name}-${index}`" v-if="user.picks[0] != null">
                        <td>{{ user.name }}</td>
                        <template v-for="pick in user.picks">
                            <td :key="`${user.name}-${index}-${pick.id}`">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <span v-on="on">
                                            {{ pick.first_name + ' ' + pick.last_name }}
                                        </span>
                                    </template>
                                    <div>
                                        Position: {{ pick.pos }}<br />
                                        Today: {{ pick.today }}<br />
                                        Thru: {{ pick.thru }}
                                    </div>
                                </v-tooltip>
                            </td>
                        </template>
                        <td class="text-center">{{ user.today }}</td>
                        <td class="text-center">{{ user.totalStrokes }}</td>
                    </tr>
                </template>
            </tbody>
        </template>
    </v-data-table>
</template>
<script>
export default {
    props: ['users'],
    data() {
        return {
            search: '',
            headers: [
                {text: 'Name', value: 'name'},
                {text: 'Golfer 1', value: 'picks[0].name'},
                {text: 'Golfer 2', value: 'picks[1].name'},
                {text: 'Golfer 3', value: 'picks[2].name'},
                {text: 'Golfer 4', value: 'picks[3].name'},
                {text: 'Golfer 5', value: 'picks[4].name'},
                {text: 'Golfer 6', value: 'picks[5].name'},
                {text: 'Today', value: 'today', align: 'center'},
                {text: 'Strokes', value: 'totalStrokes', align: 'center'},
            ]
        }
    }
}
</script>