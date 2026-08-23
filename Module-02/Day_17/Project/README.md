# TeleBirr Loyalty Points

This project is a simple loyalty points module for a TeleBirr shop. It lets customers earn and redeem points, with optional custom earn rules (like double points for holidays).  

## How the Balance Stays Private?

The points variable is declared inside the createLoyalty() function scope using let points = 0;.  
    - Closure at Work: The returned object methods (earn, redeem, and balance) form a closure over points.
    - Encapsulation: Outside code cannot read or overwrite points directly.