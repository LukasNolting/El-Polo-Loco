class Level {
    enemies;
    endboss
    clouds;
    backgroundObjects;
    level_end_x = 2800;
    coins;
    bottles;

    
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.Coins = coins;
        this.Bottles = bottles;
    }
}