import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

require('dotenv').config();

const METADATA_BASE_URI = process.env.METADATA_BASE_URI || '';

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments: { deploy }, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  await deploy('Product', {
    from: deployer,
    args: ['MyProduct', 'PRD', METADATA_BASE_URI, 'prd-001'],
    log: true
  });
}
export default main;
main.tags = ['Product'];
