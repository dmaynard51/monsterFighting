function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound : 0,
            winner: null,
            logMessages: [],

        };
    },
    computed: {
        monsterBarStyles(){
            if (this.monsterHealth < 0){
                return { width: '0%'};
            }
            
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if (this.playerHealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },

        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },

        mayUseHeal(){
            if (this.playerHealth === 100){
                return true;
            }
            else{
                return false;
            }
        }



    },

    watch:{
        playerHealth(value){
            if (value <= 0 && this.monsterHealth <=0 ){
                //draw
                this.winner = "draw"
            }
            else if (value <= 0) {  
                //player lost
                this.winner = "monster"

            }

        },
        monsterHealth(value){
            if (value <= 0 && this.playerHealth >=0 ){
                //draw
                this.winner = "draw"
            }
            else if (value <= 0) {
                //monster lost
                this.winner = "player"
            }
        }
    
    },
    methods: {
        startGame(){
            logMessages = []
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;

        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandom(5,12);
            this.monsterHealth -=  attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'attack', attackValue);
        },

        attackPlayer() {
            const attackValue = getRandom(8,15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
            
        },

        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandom(10,25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLogMessage('player', 'special', attackValue );

        },

        healPlayer(){
            this.currentRound++;
            healVal = getRandom(8,20);
            if (this.playerHealth + healVal >= 100){
                this.playerHealth  = 100;
            }
            else{
                this.playerHealth += healVal;
            }
            this.attackPlayer();
            this.addLogMessage('player', 'heal', healVal);
        },

        surrender(){
            this.winner = "monster";
            this.logMessages = []
        },

        addLogMessage(who, what, value) {
            this. logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }

        
        }

    

});

app.mount('#game');