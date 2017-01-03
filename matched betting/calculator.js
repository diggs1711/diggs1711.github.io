//Inputs
var stake = 0;
var StakeForfeit = false;

var backOdds = 0;

var layOdds = 0;
var layCommission = 0;

//Outputs
var backReturn = 0;

var layRisk = 0;
var layStake = 0;

var backProfit = 0;
var layProfit = 0;

var calcLay = document.getElementsByClassName('calculate-lay-button');
calcLay[0].addEventListener('click', function(e) {
	stake = document.getElementById('stake').value;
	backOdds = document.getElementById('back-odds').value;
	layOdds = document.getElementById('lay-odds').value;
	layCommission = document.getElementById('lay-commission').value;

	backReturn = calculateBackReturn(stake, backOdds, 0, false);
	layStake = calculateLayStake(backReturn, layOdds, layCommission);
	layRisk = calculateLayRisk(layStake, layOdds);

	alert(layStake);
	alert(layRisk);
	document.getElementsByClassName('lay-stake')[0].innerHTML = "Lay stake is " + layStake;
	console.log(calculateLayProfit());
	console.log(calculateBackProfit());
})

function calculateBackReturn(stk, bOdds, backCommission, forfeit) {
	StakeForfeit = forfeit;
	stake = stk;
	backOdds = bOdds;

	return backOdds*stake - (backCommission*((backOdds - 1)* stake)/100) - isStakeForfeit();
}

function isStakeForfeit() {
	if(StakeForfeit)
		return stake;
	return 0;
}

function calculateLayRisk(lStake, lOdds) {
	layStake = lStake;
	layOdds = lOdds;

	return layStake * (layOdds - 1);
}

function calculateLayStake(bReturns, lOdds, lCommission) {
	backReturn = bReturns;
	layOdds = lOdds;
	layCommission = lCommission;

	return backReturn/(layOdds-(layCommission/100));
}

function calculateBackProfit() {
	return backReturn - layRisk;
}

function calculateLayProfit() {
	return layStake*(100- layCommission)/100;
}
