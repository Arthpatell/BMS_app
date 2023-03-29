import { CognitoUserPool} from "amazon-cognito-identity-js";
const poolData = {
    UserPoolId : "us-east-1_QA3PHWI34",
    ClientId : "3aj314q6d52gfm69lcclq7bgt7"
}
export default new CognitoUserPool(poolData);