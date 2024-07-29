export function generate () {
    const characters = '0123456789abcdefABCDEF_';
    const length = 10;
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    
    return result;
};