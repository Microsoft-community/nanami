import Nanami from './Nanami';
import { Config } from './Types';

const config: Config = require('../config.json');

class Main {
    private Nanami: Nanami;

    public constructor() {
        this.Nanami = new Nanami(config);
    }
}