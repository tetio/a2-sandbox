export class Config {

    public static getEnvironmentVariable(value) {
        var environment:string;
        var data = {};
        environment = window.location.hostname;
        switch (environment) {
//                    endPoint: 'http://localhost:8181'
            case 'localhost':
                data = {
                    endPoint: 'http://10.120.1.182:12100'
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
                    endPoint: 'http://'+environment+':8181'
                };
        }
        return data[value];
    }
}