export const pkr = (n)=> new Intl.NumberFormat('en-PK',{ style:'currency', currency:'PKR' }).format(n||0);
