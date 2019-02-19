function drawPoseToContext(keypoints, minPartConfidence, ctx) {
    drawKeypoints(keypoints, minPartConfidence, ctx);
    drawSkeleton(keypoints, minPartConfidence, ctx);
}

const hat = new Image();
hat.src = "./hat.png"

function drawHatToContext(keypoints, minPartConfidence, ctx) {
    const leftEye =  keypoints.find(point => point.part === 'leftEye');
    const rightEye =  keypoints.find(point => point.part === 'rightEye');
    const rightEar =  keypoints.find(point => point.part === 'rightEar');
    const leftEar =  keypoints.find(point => point.part === 'leftEar');

    const centerPoints = [];

    if (leftEye) centerPoints.push(leftEye)
    if (rightEye) centerPoints.push(rightEye)
    if (rightEar) centerPoints.push(rightEar)
    if (leftEar) centerPoints.push(leftEar)

    let leftMostPoint;
    let rightMostPoint;

    for (point of centerPoints) {
        if (!leftMostPoint || point.position.x < leftMostPoint.position.x) {
            leftMostPoint = point;
        }

        if (!rightMostPoint || point.position.x > rightMostPoint.position.x) {
            rightMostPoint = point
        }
    }

    const centrePointX = (rightMostPoint.position.x + leftMostPoint.position.x) / 2

    const hatWidth = (rightMostPoint.position.x - leftMostPoint.position.x) * 1.9;

    const hatX = centrePointX - (hatWidth / 2);
    const hatY = rightEye.position.y - (hatWidth * 0.85);
    if (leftEye && rightEye) {
        ctx.drawImage(hat, hatX, hatY, hatWidth, hatWidth);
    }
}

function renderVideoFeedToContext(ctx, video) {
    ctx.clearRect(0, 0, video.width, video.height);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-video.width, 0);
    ctx.drawImage(video, 0, 0, video.width, video.height);
    ctx.restore();
}

function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
    const adjacentKeyPoints =
        posenet.getAdjacentKeyPoints(keypoints, minConfidence);

    adjacentKeyPoints.forEach((keypoints) => {
        drawSegment(
            toTuple(keypoints[0].position), toTuple(keypoints[1].position), 'aqua',
            scale, ctx);
    });
}

function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'aqua';
    ctx.stroke();
}

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];

        if (keypoint.score < minConfidence) {
            continue;
        }

        const {y, x} = keypoint.position;
        drawPoint(ctx, y * scale, x * scale, 3, 'aqua');
    }
}

function drawPoint(ctx, y, x, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}


function toTuple({y, x}) {
    return [y, x];
}
