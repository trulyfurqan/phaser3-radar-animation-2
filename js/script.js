window.onload = function() {
    var config = {
        type: Phaser.WEBGL,
        width: 800,
        height: 600,
        backgroundColor: 0xaa00aa,
        scene: [Radar2],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: 0
            }
        },
    }

    var game = new Phaser.Game(config);
}



class Radar2 extends Phaser.Scene
{
    create()
    {
        // Radar Settings
        // Note: Some settings don't work in this Radar Animation example # 2
        this.radarX = 400;
        this.radarY = 300;
        this.totalCircles = 5;
        this.circleRadius = 30;
        this.totalCircleRadius = this.circleRadius * this.totalCircles;
        this.radarScreenBorderWidth = 10;
        this.triangleLength = this.totalCircleRadius + this.radarScreenBorderWidth;
        this.triangleWidth = 100;
        this.radarRotationSpeed = 0.03;
        this.radarSignatureTimer = 2500;



        // Radar Mask - start
        this.radarLayer = this.add.layer();

        const graphics = this.make.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillCircle(this.radarX, this.radarY, this.triangleLength);

        const mask = graphics.createGeometryMask();

        this.radarLayer.setMask(mask);
        // Radar Mask - end



        // Circles Functionality - start
        // radar screen border
        this.radarScreenBorder = this.add.circle(this.radarX, this.radarY, this.totalCircleRadius + (this.radarScreenBorderWidth / 2), 0x000000);
        this.radarScreenBorder.setStrokeStyle(this.radarScreenBorderWidth, 0x008800);

        // Add to Radar Layer
        this.radarLayer.add([this.radarScreenBorder]);
        
        // We'll use this new variable inside the loop and modify its value
        this.totalCircleRadiusCopy = this.totalCircleRadius;

        for(var i = 0; i < this.totalCircles; i++)
        {
            this.circle = this.add.circle(this.radarX, this.radarY, this.totalCircleRadiusCopy, 0x000000);
            this.circle.setStrokeStyle(1, 0x008800);

            // Add to Radar Layer
            this.radarLayer.add([this.circle]);

            this.totalCircleRadiusCopy = this.totalCircleRadiusCopy - this.circleRadius;
        }
        // Circles Functionality - end



        // Lines Functionality - start
        // Verticle Line
        this.verticleLine = this.add.line(0, 0, this.radarX, this.radarY, this.radarX, this.radarY + this.triangleLength * 2 - (this.radarScreenBorderWidth * 2), 0x004400);

        // Horizontal Line
        this.horizontalLine = this.add.line(0, 0, this.radarX, this.radarY, this.radarX + this.triangleLength * 2 - (this.radarScreenBorderWidth * 2), this.radarY, 0x004400);

        // Left Diagonal
        this.leftDiagonal = this.add.line(0, 0, this.radarX, this.radarY, this.radarX + this.triangleLength * 2 - ((this.totalCircles * 1.4) + ((this.circleRadius / 2) / 2) + ((this.circleRadius / 2) * this.totalCircles)) - (this.radarScreenBorderWidth * 2), this.radarY + (((this.circleRadius * 1.5) * this.totalCircles) - ((this.circleRadius / 2) / 2)) - (this.totalCircles * 1.4), 0x004400);

        // Right Diagonal
        this.rightDiagonal = this.add.line(0, 0, this.radarX, this.radarY + (((this.circleRadius * 1.5) * this.totalCircles) - ((this.circleRadius / 2) / 2)) - (this.totalCircles * 1.4), this.radarX + this.triangleLength * 2 - ((this.totalCircles * 1.4) + ((this.circleRadius / 2) / 2) + ((this.circleRadius / 2) * this.totalCircles)) - (this.radarScreenBorderWidth * 2), this.radarY, 0x004400);

        // Add to Radar Layer
        this.radarLayer.add([this.verticleLine, this.horizontalLine, this.leftDiagonal, this.rightDiagonal]);

        // =====
        
        // Test Left Diagonal - (Uncomment one of the below lines and test the diagonal manually)
        //this.ld1 = this.add.triangle(this.radarX, this.radarY, 150, 150, 150, 0, 0, 0, 0x00fb00);
        //this.ld2 = this.add.triangle(this.radarX, this.radarY, 150, 150, 0, 150, 0, 0, 0x00fb00);

        // Test Right Diagonal - (Uncomment one of the below lines and test the diagonal manually)
        //this.rd1 = this.add.triangle(this.radarX, this.radarY, 0, 0, 150, 0, 0, 150, 0x00fb00);
        //this.rd2 = this.add.triangle(this.radarX, this.radarY, 0, 150, 150, 150, 150, 0, 0x00fb00);
        // Lines Functionality - end



        this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0x00fb00 }, fillStyle: { color: 0x00fb00 } });

        // This triangle acts like a Radar Signal / Rotating Light
        this.triangle = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 83, 50, this.triangleLength + 100, 60, this.triangleLength + 100, -40, 0x00fb00, 0.5);


        
        /*
        // ### The exact same values of triangle from Example # 1 don't work in this example.
        // This triangle acts like a Radar Signal / Rotating Light
        //this.triangle = new Phaser.Geom.Triangle(this.radarX, this.radarY, this.radarX + this.triangleLength, this.radarY + this.triangleWidth, this.radarX + this.triangleLength, this.radarY - this.triangleWidth);

        this.triangle = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, this.radarX, this.radarY, this.radarX + this.triangleLength, this.radarY + this.triangleWidth, this.radarX + this.triangleLength, this.radarY - this.triangleWidth, 0x00fb00, 1);
        */



        // Not Working
        /*
        this.triangleMask = new Phaser.Display.Masks.GeometryMask(this.game.scene, this.triangle);
        this.triangleMask.setShape(this.radarScreenBorder);
        */



        // Enemies Radar Signature - start
        this.enemies = [
            // Low Radar Signature - e.g. Drone, Semi-Stealth Fighter
            this.add.circle(this.radarX + 50, this.radarY + 115, 1, 0xff0000),
            this.add.circle(this.radarX + 10, this.radarY + 135, 1, 0xff0000),

            // Medium Radar Signature - e.g. Fighter Jet
            this.add.circle(this.radarX + 50, this.radarY + 25, 3, 0xff0000),
            this.add.circle(this.radarX + 10, this.radarY + 45, 3, 0xff0000),
            this.add.circle(this.radarX + -10, this.radarY + -35, 3, 0xff0000),
            this.add.circle(this.radarX + -70, this.radarY + -20, 3, 0xff0000),

            // Hight Radar Signature - e.g. Heavy Bomber
            this.add.circle(this.radarX + -120, this.radarY + 40, 5, 0xff0000)
        ];

        for(var i = 0; i < this.enemies.length; i++)
        {
            this.enemies[i].visible = false;

            // Add to Radar Layer
            this.radarLayer.add([this.enemies[i]]);

            // ### 1- This functinality is not working
            this.enemies[i].rectBounds = this.enemies[i].getBounds();

            // ### 2- This functinality is also not working
            this.physics.add.overlap(this.enemies[i], this.triangle, () => console.log('Overlaped!'));
        }
        // Enemies Radar Signature - end



        // Friendly Radar Signature - start
        this.friendlies = [
            // Low Radar Signature - e.g. Drone, Semi-Stealth Fighter
            this.add.circle(this.radarX + 100, this.radarY + -75, 1, 0x00ff00),

            // Medium Radar Signature - e.g. Fighter Jet
            this.add.circle(this.radarX + 10, this.radarY + 5, 3, 0x00ff00),
            this.add.circle(this.radarX + 50, this.radarY + -90, 3, 0x00ff00),
            this.add.circle(this.radarX + 40, this.radarY + -100, 3, 0x00ff00),
            this.add.circle(this.radarX + 40, this.radarY + -90, 3, 0x00ff00)
        ];

        for(var i = 0; i < this.friendlies.length; i++)
        {
            this.friendlies[i].visible = false;

            // Add to Radar Layer
            this.radarLayer.add([this.friendlies[i]]);
        }
        // Friendly Radar Signature - end



        // Add to Radar Layer
        // - I've added it at the end to make sure that the radar light triangle stays on top of other things like enemy/friendly circles, lines, etc.
        this.radarLayer.add([this.triangle]);

        // Display a Dot in Center of Radar Screen
        this.point = this.add.circle(this.radarX, this.radarY, 2, 0x009900);

        // Add to Radar Layer
        // - this dot will display on top of radar light triangle
        this.radarLayer.add([this.point]);
    }

    update()
    {
        this.triangle.setRotation(this.triangle.rotation + this.radarRotationSpeed - 0.02);



        // Enemies Radar Signature - start
        for(var i = 0; i < this.enemies.length; i++)
        {
            // Not Working
            /*
            if(Phaser.Geom.Intersects.TriangleToCircle(this.triangle.geom, this.enemies[i]) === true)
            {
                console.log("hit");
                this.enemies[i].visible = true;

                this.time.addEvent({ delay: this.radarSignatureTimer, callback: this.hideRadarSignature, callbackScope: this.enemies[i], loop: false });
            }
            */



            // Not Working
            /*
            if (Phaser.Geom.Intersects.RectangleToTriangle(this.enemies[i].rectBounds, this.triangle.geom) === true)
            {
                this.enemies[i].visible = true;

                this.time.addEvent({ delay: this.radarSignatureTimer, callback: this.hideRadarSignature, callbackScope: this.enemies[i], loop: false });
            }
            */
        }
        // Enemies Radar Signature - end



        
       // Friendly Radar Signature - start
       for(var i = 0; i < this.friendlies.length; i++)
       {
            // No functionality is added here yet.
            // I'll copy the enemies functionality here once the issue is fixed.
       }
       // Friendly Radar Signature - end
    }

    hideRadarSignature()
    {
        this.visible = false;
    }
}