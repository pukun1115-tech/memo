/**
 * @param {number} si 柱の断面の円の頂点数
 * @param {number} sj トーラスを構成する断面の円の数
 * @param {number} r
 * @param {number} R
 * @returns {}
 */
function torus(si, sj, r, R) {
    let pos = [];
    let color = [];
    let index = [];
    
    for (let i = 0; i < si; i++) {
        const a = ((Math.PI * 2) / si) * i;//角度(0 ~ Math.PI * 2)
        const cosA = Math.cos(a);//x
        const sinA = Math.sin(a);//y
        for (let j = 0; j < sj; j++) {
            const b = ((Math.PI * 2) / sj) * j;//角度(0 ~ Math.PI * 2)
            const cosB = Math.cos(b);
            const sinB = Math.sin(b);
            const x = (r * );
            const y = ;
            const z = ;
            pos.push(x, y, z);
        }
    }
    return [pos, color, index];
}
