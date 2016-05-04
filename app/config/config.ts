export class Config {

    public static getEnvironmentVariable(value) {
        var environment:string;
        var data = {};
        environment = window.location.hostname;
        switch (environment) {
            case 'localhost':
                data = {
                    endPoint: 'http://localhost:8181'
                };
                break;
             case '10.120.1.182':
                data = {
                    endPoint: 'http://10.120.1.182:12100'
                };
                break;
             case 'reingtest.portic.net':
                data = {
                    endPoint: 'http://reingtest.portic.net'
                };
                break;
             case 'app.portic.net':
                data = {
                    endPoint: 'http://app.portic.net'
                };
                break;

            default:
                data = {
                    endPoint: ''
                };
        }
        return data[value];
    }
}