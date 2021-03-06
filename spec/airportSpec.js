'use strict'

describe('Airport', function() {
    var airport;
    var plane;

    beforeEach(function() {
        airport = new Airport();
        plane = jasmine.createSpy('plane',['land']);
    });

    it('has no planes by default', function() {
      expect(airport.planes()).toEqual([]);
    });

    it('can clear palnes for landing', function() {
        airport.clearForLanding(plane);
        expect(airport.planes()).toEqual([plane]);
    });

    it('can clear planes for take off', function() {
        airport.clearForLanding(plane);
        airport.clearForTakeOff(plane);
        expect(airport.planes()).toEqual([])
    });

    it('can check for stormy condition', function() {
        expect(airport.isStormy()).toBeFalsy();
    });

    describe('under stormy conditions', function() {
        it('does not clear planes to take off', function() {
            spyOn(airport, 'isStormy').and.returnValue(true);
            expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('can not take off during the storm')
        });

        it('prevents plane from landing', function() {
            spyOn(airport, 'isStormy').and.returnValue(true);
            expect(function() { airport.clearForLanding(plane) }).toThrowError('can not land during the stormy weather')
        });
    });

});