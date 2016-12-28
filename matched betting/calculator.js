var stake = 0;
var StakeForfeit = false;

var backOdds = 0;
var backReturn = 0;

var layOdds = 0;
var layCommission = 0;
var layRisk = 0;
var layStake = 0;

var backProfit = 0;
var layProfit = 0;

function calculateBackReturn(s, bOdds, backCommission, forfeit) {
	StakeForfeit = forfeit;
	stake = s;
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

backReturn = calculateBackReturn(25, 15, 0, true);
layStake = calculateLayStake(backReturn, 15, 5);
layRisk = calculateLayRisk(layStake, layOdds);

console.log(calculateLayProfit());
console.log(calculateBackProfit());