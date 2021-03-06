import { Area } from '../Models/Area';
import { AreaName} from '../Enums/AreaNames';
import { THE_SHIRE } from '../Enums/AreaAdjacencies';
import { assert } from 'chai';
import 'mocha';

describe('Area', () => {
    let area: Area;
    beforeEach(function () {
        area = new Area(AreaName.THE_SHIRE, THE_SHIRE);
    })

    it('should have a name', () => {
        const result = area.getName();
        assert.equal(result, AreaName.THE_SHIRE);
    });

    it('should specify site of power', () => {
        const result = area.getIsSiteOfPower();
        assert.equal(result, false);
    });

    it('should not start with a leader', () => {
        const result = area.getHasLeader();
        assert.equal(result, false);
    });

    it('should be able to add a leader', () => {
        area.changeHasLeader();
        const result = area.getHasLeader();
        assert.equal(result, true);
    });

    it('should not start with any units', () => {
        const result = area.hasUnitsRemaining();
        assert.equal(result, false);
    });

    it('should be able to add units', () => {
        area.addUnits(5);
        const result = area.getUnits();
        assert.equal(result, 5);
    });

    it('should be able to remove units', () => {
        area.addUnits(5);
        area.removeUnits(4);
        const result = area.getUnits();
        assert.equal(result, 1);
    });
});