(function() {
    var calculator = {
        stake: 0,
        StakeForfeit: false,
        backOdds: 0,
        layOdds: 0,
        layCommission: 0,
        backReturn: 0,
        layRisk: 0,
        layStake: 0,
        backProfit: 0,
        layProfit: 0,
        calBtn: null,
        inputStake: null,
        inputBackOdds: null,
        inputLayOdds: null,
        outputDisplay: null,
        inputLayComission: null,
        init: function() {
            this.initDisplayElements();
            this.initBtns();
            this.initBtnEvents();
        },
        initDisplayElements: function() {
            inputStake = document.getElementById('stake');
            inputBackOdds = document.getElementById('back-odds');
            inputLayOdds = document.getElementById('lay-odds');
            inputLayCommission = document.getElementById('lay-commission');
            outputDisplay = document.getElementsByClassName('lay-stake')[0];
        },
        initBtns: function() {
            calBtn = document.getElementsByClassName('js-calcualte-btn');
        },
        initBtnEvents: function() {
        	var me = this;
            calBtn[0].addEventListener('click', me.getInputValues.bind(this))
        },
        getInputValues: function() {
        	stake = inputStake.value;
        	backOdds = inputBackOdds.value;
        	layOdds = inputLayOdds.value;
        	layCommission = inputLayCommission.value;

        	this.calculateOutputValues();
        },
        calculateOutputValues: function() {
            backReturn = this.calculateBackReturn(stake, backOdds, 0, false);
            layStake = this.calculateLayStake(backReturn, layOdds, layCommission);
            layRisk = this.calculateLayRisk(layStake, layOdds);

            console.log(backReturn, layStake, layRisk);
            this.displayOutputValues();
        },
        displayOutputValues: function() {
            outputDisplay.innerHTML = "Lay Stake is " + Math.round(layStake * 100) / 100;
        },
        calculateBackReturn: function(stk, bOdds, backCommission, forfeit) {
            StakeForfeit = forfeit;
            stake = stk;
            backOdds = bOdds;

            return backOdds * stake - (backCommission * ((backOdds - 1) * stake) / 100) - this.isStakeForfeit();
        },
        calculateLayStake: function(bReturns, lOdds, lCommission) {
            backReturn = bReturns;
            layOdds = lOdds;
            layCommission = lCommission;

            return backReturn / (layOdds - (layCommission / 100));
        },
        calculateLayRisk: function(lStake, lOdds) {
            layStake = lStake;
            layOdds = lOdds;

            return layStake * (layOdds - 1);
        },
        isStakeForfeit: function() {
            if (StakeForfeit)
                return stake;
            return 0;
        },
        calculateBackProfit: function(){
        	return backReturn - layRisk;
        },
        calculateLayProfit: function() {
        	return layStake * (100 - layCommission) / 100;
        }
    }

    calculator.init();
})();
