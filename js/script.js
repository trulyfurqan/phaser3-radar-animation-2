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
        this.radarX = 400;
        this.radarY = 300;
        this.totalCircles = 5;
        this.circleRadius = 30;
        this.totalCircleRadius = this.circleRadius * this.totalCircles;
        this.triangleLength = this.totalCircleRadius;
        this.radarRotationSpeed = 0.03;
        this.radarSignatureTimer = 2500;



        // Radar Mask - start
        this.radarLayer = this.add.layer();

        const graphics = this.make.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillCircle(this.radarX, this.radarY, this.triangleLength + 2);

        const mask = graphics.createGeometryMask();

        this.radarLayer.setMask(mask);
        // Radar Mask - end



        // Circles Functionality - start
        for(var i = 0; i < this.totalCircles; i++)
        {
            if(i === 0)
            {
                // outer most circle
                this.circle = this.add.circle(this.radarX, this.radarY, this.totalCircleRadius, 0x000000);
                this.circle.setStrokeStyle(4, 0x008800);

                // Add to Radar Layer
                this.radarLayer.add([this.circle]);
            }

            this.totalCircleRadius = this.totalCircleRadius - this.circleRadius;

            if(this.totalCircleRadius > 0)
            {
                this.circle2 = this.add.circle(this.radarX, this.radarY, this.totalCircleRadius, 0x000000);
                this.circle2.setStrokeStyle(1, 0x008800);

                // Add to Radar Layer
                this.radarLayer.add([this.circle2]);
            }
            else
            {
                break;
            }            
        }
        // Circles Functionality - end

        // Lines Functionality - start
        // Verticle Line
        this.verticleLine = this.add.line(0, 0, this.radarX, this.radarY, this.radarX, this.radarY + this.triangleLength * 2 - 4, 0x004400);

        // Horizontal Line
        this.horizontalLine = this.add.line(0, 0, this.radarX, this.radarY, this.radarX + this.triangleLength * 2 - 4, this.radarY, 0x004400);

        // Left Diagonal
        //this.add.line(0, 0, this.radarX, this.radarY, this.radarX + this.triangleLength * 2 - 65, this.radarY + 180, 0x004400);
        this.leftDiagonal = this.add.line(0, 0, this.radarX, this.radarY, this.radarX + this.triangleLength * 2 - 90, this.radarY + 210, 0x004400);
        //this.add.line(0, 0, this.radarX, this.radarY, this.radarX + this.triangleLength * 2 - 215, this.radarY + 85, 0x004400);

        // Right Diagonal
        //this.add.line(0, 0, this.radarX, this.radarY + 180, this.radarX + this.triangleLength * 2 - 65, this.radarY, 0x004400);
        this.rightDiagonal = this.add.line(0, 0, this.radarX, this.radarY + 210, this.radarX + this.triangleLength * 2 - 90, this.radarY, 0x004400);
        //this.add.line(0, 0, this.radarX, this.radarY + 85, this.radarX + this.triangleLength * 2 - 215, this.radarY, 0x004400);

        // Add to Radar Layer
        this.radarLayer.add([this.verticleLine, this.horizontalLine, this.leftDiagonal, this.rightDiagonal]);
        // Lines Functionality - end

        

        this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0x00fb00 }, fillStyle: { color: 0x00fb00 } });
        
        //this.triangle = new Phaser.Geom.Triangle(this.radarX, this.radarY, this.radarX + this.triangleLength, this.radarY + 20, this.radarX + this.triangleLength, this.radarY - 20);
        //this.triangle = new Phaser.Geom.Triangle(this.radarX, this.radarY, this.radarX + this.triangleLength, this.radarY + 60, this.radarX + this.triangleLength, this.radarY - 60);


        //console.log(this.scene.scene);
        
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 0, 0, 200, 50, 200, -50, 0x00fb00);
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 65, 55, 200, 50, 200, -50, 0x00fb00);
        
        
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75, 30, this.triangleLength + 80, 40, this.triangleLength + 80, -20, 0x00fb00, 0.5);

        this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 83, 50, this.triangleLength + 100, 60, this.triangleLength + 100, -40, 0x00fb00, 0.5);








        /*
        // ### The exact same values of triangle from Example # 1 don't work in this example.
        // This triangle acts like a Radar Signal / Rotating Light
        //this.triangle = new Phaser.Geom.Triangle(this.radarX, this.radarY, this.radarX + this.triangleLength, this.radarY + this.triangleWidth, this.radarX + this.triangleLength, this.radarY - this.triangleWidth);

        this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, this.radarX, this.radarY, this.radarX + this.triangleLength, this.radarY + this.triangleWidth, this.radarX + this.triangleLength, this.radarY - this.triangleWidth, 0x00fb00, 1);
        */

        







        /*
        // Formula
        // Note: The fact that all angles of a triangle add up to 180 degrees
        // => remaining_angle = 180 - this.radarAngle
        // => angle_2 = remaining_angle / 2
        // => angle_3 = remaining_angle / 2


        // FROM 1 TO 178
        this.radarAngle = 1; // Input By User

        this.remainingAngle = 180 - this.radarAngle;
        this.radarAngle2 = this.remainingAngle / 2;
        this.radarAngle3 = this.remainingAngle / 2;

        // XY
        this.x1 = 0;
        this.y1 = 0;

        this.x2 = 100;
        this.y2 = 0;

        this.x3 = 50;
        this.y3 = 86.603;

        this.width = 100;
        this.height = 200;


        // [(x,y), (x+(w/2),y-h), (x+w,y)]

        // FORMAT
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, x1, y1, x2, y2, x3, y3, 0x00fb00, 1);

        this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, 0x00fb00, 1);
        */

        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, this.x1, this.y1, this.x2 + (this.width / 2), this.y2 - this.height, this.x3 + this.width, this.y3, 0x00fb00, 1);

        

        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.radarAngle / 2 - (this.radarAngle / 6.25) - 0, 30 + this.radarAngle, this.triangleLength + 80 + this.radarAngle, 40 + this.radarAngle, this.triangleLength + 80 + this.radarAngle, -20 - this.radarAngle, 0x00fb00, 1);







        /*
        this.expandRadarLight = 200;


        // Dynamic
        this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - (this.expandRadarLight / 6.25) - 0, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);
        */


        // -20
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - -4, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);

        
        // -10
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - -4, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);
        
        // 0
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - -2, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);
        
        // 10
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 1.5, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 20
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 3, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 25
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 4, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 30
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 5, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 40
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 6, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 50
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 8, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 60
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 10, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 100
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 16, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 200
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 32, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 400
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 64, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);


        // 800
        //this.t = new Phaser.GameObjects.Triangle(this.scene.scene, this.radarX, this.radarY, 75 + this.expandRadarLight / 2 - 132, 30 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, 40 + this.expandRadarLight, this.triangleLength + 80 + this.expandRadarLight, -20 - this.expandRadarLight, 0x00fb00, 1);




        //this.t.setRotation(3.14 / 6);


        //console.log(this.triangleLength);

        //this.t = this.add.triangle(this.radarX, this.radarY, 0, 100, 100, 200, 100, -50, 0x00fb00);
        

        // Test Right Diagonal
        //this.t1 = this.add.triangle(this.radarX, this.radarY, 0, 0, 150, 0, 0, 150, 0x00fb00);
        //this.t2 = this.add.triangle(this.radarX, this.radarY, 0, 150, 150, 150, 150, 0, 0x00fb00);

        // Test Left Diagonal
        //this.t3 = this.add.triangle(this.radarX, this.radarY, 150, 150, 150, 0, 0, 0, 0x00fb00);
        //this.t4 = this.add.triangle(this.radarX, this.radarY, 150, 150, 0, 150, 0, 0, 0x00fb00);


        //this.tGeom = this.t.geom.setTo(this.radarX, this.radarY, this.radarX + this.triangleLength, this.radarY + 60, this.radarX + this.triangleLength, this.radarY - 60);

        // Add to Radar Layer
        //this.radarLayer.add([this.t]);

        /*
        console.log(this.triangle);
        console.log(this.circle);
        console.log(this.t);
        */

        

        /*
        this.triangleMask = new Phaser.Display.Masks.GeometryMask(this.game.scene, this.triangle);
        this.triangleMask.setShape(this.circle);
        */
        // -----------------------

        
        


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
            //this.enemies[i].visible = false;


            

            //console.log(this.enemies[i]);

            // Add to Radar Layer
            this.radarLayer.add([this.enemies[i]]);


            //this.enemies[i].rectBounds = this.t.getBounds();



            //this.physics.arcade.overlap(this.enemies[i], this.t, () => console.log('boom!'));

            //new Phaser.Physics.Arcade.ArcadePhysics.overlap(this.enemies[i], this.t, () => console.log('boom!'));

            //console.log(this.scene.scene.physics);

            /*
            this.pa = new Phaser.Physics.Arcade.ArcadePhysics(this.scene.scene);

            //console.log(this.pa);

            this.pa.overlap(this.enemies[i], this.t, () => console.log('boom!'));
            */

            //console.log(this.game.scene.scenes[6].game.scene);

            //console.log(this.physics);

            this.physics.add.overlap(this.enemies[i], this.t, () => console.log('boom!'));

            console.log(this.enemies[i]);
        }
        // Enemies Radar Signature - end

        console.log(this.t);



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
        this.radarLayer.add([this.t]);

        //this.point = {x: this.radarX, y: this.radarY};
        this.point = this.add.circle(this.radarX, this.radarY, 2, 0x009900);

        //console.log(this.point);

        // Add to Radar Layer
        // - this dot will display on top of radar light triangle
        this.radarLayer.add([this.point]);
    }

    update()
    {
        this.t.setRotation(this.t.rotation + this.radarRotationSpeed - 0.02);



        /*
        this.graphics.clear();
        this.graphics.fillGradientStyle(0x00fb00, 0x00fb00, 0x00fb00, 0x00fb00, 0.5);
        //this.graphics.strokeTriangleShape(this.t.geom);
        this.graphics.fillTriangleShape(this.t.geom);
        
        Phaser.Geom.Triangle.RotateAroundPoint(this.t.geom, this.point, this.radarRotationSpeed);

        console.log(this.t.geom);
        */



        /*
        this.radarLight = this.t.getBounds();
        console.log(this.radarLight);

        // Add to Radar Layer
        //this.radarLayer.add([this.radarLight]);

        this.graphics.clear();
        this.graphics.fillGradientStyle(0x00fb00, 0x00fb00, 0x00fb00, 0x00fb00, 1);
        this.graphics.fillRectShape(this.radarLight);
        */


        // Enemies Radar Signature - start
        for(var i = 0; i < this.enemies.length; i++)
        {
            /*
            if(Phaser.Geom.Intersects.TriangleToCircle(this.t.geom, this.enemies[i]) === true)
            {
                console.log("hit");
                this.enemies[i].visible = true;

                this.time.addEvent({ delay: this.radarSignatureTimer, callback: this.hideRadarSignature, callbackScope: this.enemies[i], loop: false });
            }
            */

            /*
            if (Phaser.Geom.Intersects.CircleToRectangle(this.enemies[i], this.radarLight) === true)
            {
                this.enemies[i].visible = true;

                this.time.addEvent({ delay: this.radarSignatureTimer, callback: this.hideRadarSignature, callbackScope: this.enemies[i], loop: false });
            }
            */

            //console.log(this.enemies[i].getBounds());

            /*
            if (Phaser.Geom.Intersects.RectangleToTriangle(this.enemies[i].getBounds(), this.radarLight) === true)
            {
                this.enemies[i].visible = true;

                this.time.addEvent({ delay: this.radarSignatureTimer, callback: this.hideRadarSignature, callbackScope: this.enemies[i], loop: false });
            }
            */
        }
        // Enemies Radar Signature - end



        /*
       this.graphics.clear();
       Phaser.Geom.Triangle.RotateAroundPoint(this.triangle, this.point, this.radarRotationSpeed);
       //Phaser.Geom.Triangle.RotateAroundPoint(this.t.geom, this.point, this.radarRotationSpeed);
       
       //this.graphics.fillGradientStyle(0x00fb00, 0x00fb00, 0xffffff, 0xffffff, 0.5);
       this.graphics.fillGradientStyle(0x00fb00, 0x00fb00, 0x00fb00, 0x00fb00, 0.5);
       //this.graphics.fillGradientStyle(0x00fb00, 0x00fb00, 0x000000, 0x000000, 0.4);

       //this.graphics.strokeTriangleShape(this.triangle);
       this.graphics.fillTriangleShape(this.triangle);

       //this.graphics.fillPointShape(this.point, 5);
       
       // Enemies Radar Signature - start
        for(var i = 0; i < this.enemies.length; i++)
        {
            if(Phaser.Geom.Intersects.TriangleToCircle(this.triangle, this.enemies[i]) === true)
            {
                this.enemies[i].visible = true;

                this.time.addEvent({ delay: this.radarSignatureTimer, callback: this.hideRadarSignature, callbackScope: this.enemies[i], loop: false });
            }
        }
       // Enemies Radar Signature - end



       // Friendly Radar Signature - start
       for(var i = 0; i < this.friendlies.length; i++)
       {
           if(Phaser.Geom.Intersects.TriangleToCircle(this.triangle, this.friendlies[i]) === true)
           {
               this.friendlies[i].visible = true;

               this.time.addEvent({ delay: this.radarSignatureTimer, callback: this.hideRadarSignature, callbackScope: this.friendlies[i], loop: false });
           }
       }
      // Friendly Radar Signature - end
      */
    }

    hideRadarSignature()
    {
        this.visible = false;
    }
}