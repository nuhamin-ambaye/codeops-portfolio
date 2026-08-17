function createLoyalty(earnRule = (etb) => Math.floor(etb / 10)) {
  let points = 0;

  return {
    earn(etb) {
      points += earnRule(etb);
    },

    redeem(p) {
      points = Math.max(0, points - p);
    },

    balance() {
      return points;
    },
  };
}

const card = createLoyalty();
card.earn(250);
console.log("Card balance:", card.balance());

card.redeem(10);
console.log("Card balance after redeem:", card.balance());

card.redeem(100);
console.log("Card balance after over-redeem:", card.balance());

const holidayEarnRule = (etb) => Math.floor(etb / 10) * 2;
const holidayCard = createLoyalty(holidayEarnRule);

holidayCard.earn(250);
console.log("Holiday card balance:", holidayCard.balance());
console.log("Original card balance:", card.balance());