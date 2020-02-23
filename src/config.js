const region = 'us-east-2';
const api_gate_way_url = "https://tssv01t70k.execute-api.us-east-2.amazonaws.com/dev";
const bucket_name = 'note-taking-attachments';
const USER_POOL_ID = 'us-east-2_blkBQuK6A';
const APP_CLIENT_ID = '76j6d9e6pnbbsd67cja51g8jqb';
const IDENTITY_POOL_ID = "us-east-2:c21aec24-f56d-4fbe-9757-970e4a156f72";

export default {
    s3: {
        REGION: `${region}`,
        BUCKET: `${bucket_name}`
    },
    apiGateway: {
        REGION: `${region}`,
        URL: `${api_gate_way_url}`,
    },
    cognito: {
        REGION: `${region}`,
        USER_POOL_ID: `${USER_POOL_ID}`,
        APP_CLIENT_ID: `${APP_CLIENT_ID}`,
        IDENTITY_POOL_ID: `${IDENTITY_POOL_ID}`
    }
};