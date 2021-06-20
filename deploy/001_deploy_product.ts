import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments: { deploy }, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  await deploy('Product', {
    from: deployer,
    args: ['MyProduct', 'PRD', 'http://localhost/baseuri/', 'prd-001'],
    log: true
  });
}
export default main;
main.tags = ['Product'];
