export const TOKEN_ADDRESS = '0x2ff011AB6Cf2eC072E1a99f01106f6B2D139e731';

export const TOKEN_ABI = '[{"inputs":[{"internalType":"address[]","name":"validators_","type":"address[]"},{"internalType":"address[]","name":"workers_","type":"address[]"},{"internalType":"uint256[]","name":"levels_","type":"uint256[]"},{"internalType":"address","name":"feeReceiver_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"AntiDumpActivated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"AntiSnipeExcluded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"AntiWhaleExcluded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"decreeId","type":"uint256"}],"name":"DecreeAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"decreeId","type":"uint256"},{"indexed":true,"internalType":"address","name":"approver","type":"address"}],"name":"DecreeApproved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"decreeId","type":"uint256"},{"indexed":true,"internalType":"address","name":"creator","type":"address"}],"name":"DecreeCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"thing","type":"address"}],"name":"DexPeripheryRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"isExcluded","type":"bool"}],"name":"FeeExcluded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"buyMillis","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sellMillis","type":"uint256"}],"name":"MarketFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"}],"name":"MarketRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"thing","type":"address"}],"name":"NewDexPeriphery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"}],"name":"NewMarket","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"bool","name":"itIs","type":"bool"}],"name":"ValidatorUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint8","name":"newLevel","type":"uint8"}],"name":"WorkerUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"decreeId","type":"uint256"}],"name":"approveDecree","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"actionId","type":"uint8"},{"internalType":"uint256[]","name":"uints","type":"uint256[]"},{"internalType":"bool[]","name":"bools","type":"bool[]"},{"internalType":"address[]","name":"addresses","type":"address[]"}],"name":"createDecree","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decreesCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dumpActivatedAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dumpMinControlVolume","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"decreeId","type":"uint256"}],"name":"getDecreeData","outputs":[{"components":[{"internalType":"uint256","name":"actionId","type":"uint256"},{"internalType":"string","name":"actionDescription","type":"string"},{"internalType":"uint256","name":"createdAt","type":"uint256"},{"internalType":"bool","name":"accepted","type":"bool"},{"internalType":"address[]","name":"approvers","type":"address[]"},{"internalType":"uint256","name":"approvesNeed","type":"uint256"},{"internalType":"uint256","name":"uintParam","type":"uint256"},{"internalType":"uint256[]","name":"uintParams","type":"uint256[]"},{"internalType":"bool","name":"boolParam","type":"bool"},{"internalType":"bool[]","name":"boolParams","type":"bool[]"},{"internalType":"address","name":"addressParam","type":"address"},{"internalType":"address[]","name":"addressParams","type":"address[]"}],"internalType":"struct Governance.DecreeData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getWorkerLevel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDexPeriphery","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isFeeExcluded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isSnipeExcluded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isValidator","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhaleExcluded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"markets","outputs":[{"internalType":"bool","name":"isMarket","type":"bool"},{"internalType":"bool","name":"antiBotEnabled","type":"bool"},{"internalType":"bool","name":"launchAllowed","type":"bool"},{"internalType":"uint256","name":"launchedAt","type":"uint256"},{"internalType":"uint256","name":"buyFeeMillis","type":"uint256"},{"internalType":"uint256","name":"sellFeeMillis","type":"uint256"},{"internalType":"uint256","name":"minWhaleLimit","type":"uint256"},{"internalType":"uint256","name":"buyWhaleLimit","type":"uint256"},{"internalType":"uint256","name":"sellWhaleLimit","type":"uint256"},{"components":[{"internalType":"uint256","name":"buyPeriod","type":"uint256"},{"internalType":"uint256","name":"buyVolume1","type":"uint256"},{"internalType":"uint256","name":"buyVolume2","type":"uint256"},{"internalType":"uint256","name":"buyVolume3","type":"uint256"},{"internalType":"uint256","name":"buyVolumeTemp","type":"uint256"},{"internalType":"uint256","name":"sellPeriod","type":"uint256"},{"internalType":"uint256","name":"sellVolume1","type":"uint256"},{"internalType":"uint256","name":"sellVolume2","type":"uint256"},{"internalType":"uint256","name":"sellVolume3","type":"uint256"},{"internalType":"uint256","name":"sellVolumeTemp","type":"uint256"}],"internalType":"struct FormaCarGame.WhaleData","name":"whale","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"traders","outputs":[{"internalType":"uint256","name":"firstBuyAt","type":"uint256"},{"internalType":"uint8","name":"buyCount","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
