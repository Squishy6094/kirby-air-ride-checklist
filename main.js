const TEX_CHECK_DEFAULT = get_texture_info("textures/unlocks/unlock-check.png")
const TEX_CHECK_SOUND_TEST = get_texture_info("textures/unlocks/unlock-sound-test.png")
const TEX_CHECK_MUSIC = get_texture_info("textures/unlocks/unlock-music.png")
const TEX_CHECK_MOVIE = get_texture_info("textures/unlocks/unlock-movie.png")

let checklistData = [
    [ // Air Ride
        {
            name: ["Time Attack: CHECKER KNIGHTS", "Finish in under 04:00:00!"],
        },
        {
            name: ["Race over 300 laps"],
            reward: {
                name: "Music: Nebula",
                image: TEX_CHECK_MUSIC,
            },
        },
        {
            name: ["Free Run: CHECKER KNIGHTS", "Finish 1 lap in under 01:35:00!"],
        },
        {
            name: ["MAGMA FLOWS: Bump into", "a flaming dragon!"],
        },
        {
            name: ["Time Attack: BEANSTALK PARK", "Finish in under 02:55:00!"],
        },
        {
            name: ["Race all of the standard", "Air Ride course!"],
            reward: {
                name: "New Machine: WHEELIE BIKE",
                image: get_texture_info("textures/unlocks/unlock-star-wheelie.png"),
            },
        },
        {
            name: ["CHECKER KNIGHTS: Use spin panels", "7 times or more and take 1st place!"],
            reward: {
                name: "Music: Checker",
                image: TEX_CHECK_MUSIC,
            },
        },
        {
            name: ["Free Run: SKY SANDS", "Do 1 lap under 01:05:00 on Bulk Star!"],
            reward: {
                name: "Brown Kirby",
                image: get_texture_info("textures/unlocks/unlock-kirby-brown.png"),
            },
        },
        {
            name: ["Air Ride: Finish in 1st place", "with Wing ability!"],
        },
        {
            name: ["Defeat 10 or more enemies", "using the Quick Spin!"],
            reward: {
                name: "New Machine: SHADOW STAR",
                image: get_texture_info("textures/unlocks/unlock-star-shadow.png"),
            },
        },
        {
            name: ["Swallow Plasma Wisp (electrical enemy)", "3 or more times and take 1st place!"],
        },
        {
            name: ["Free Run: BEANSTALK PARK", "Finish 1 lap in under 01:07:00!"],
        },
        {
            name: ["Time Attack: SKY SANDS", "Finish in under 03:10:00!"],
            reward: {
                name: "Sound Test: SKY SANDS",
                image: TEX_CHECK_SOUND_TEST,
            },
        },
        {
            name: ["Free Run: FANTASY MEADOWS", "Finish 1 lap in under 00:24:00!"],
        },
        {
            name: ["Glide for more than 1 hour!"],
            reward: {
                name: "Bonus Movie: Special machine intros",
                image: TEX_CHECK_MOVIE,
            },
        },
        {
            name: ["Free Run: FANTASY MEADOWS","Finish 1 lap in under 00:21:00!"],
            reward: {
                name: "Sound Test: FANTASY MEADOWS",
                image: TEX_CHECK_SOUND_TEST,
            },
        },
        {
            name: ["Time Attack: MAGMA FLOWS","Finish in under 03:20:00!"],
            reward: {
                name: "Sound Test: FANTASY MEADOWS",
                image: TEX_CHECK_SOUND_TEST,
            },
        },
        {
            name: ["SKY SANDS: Break all of the coral","and finish in 1st place!"],
            reward: {
                name: "Check off an empty box of your choice!",
                image: get_texture_info("textures/unlocks/unlock-check.png"),
            },
        },
        {
            name: ["Free Run: MACHINE PASSAGE","Do 1 lap under 00:57:00 on Swerve Star!"],
        },
        {
            name: ["Free Run: FROZEN HILLSIDE","Do 1 lap under 01:10:00 on Formula Star!"],
        },
        {
            name: ["Swallow Wheelie (motorcycle enemy)","3 times or more and take 1st place!"],
        },
        {
            name: ["Free Run: CELESTIAL VALLEY","Finish 1 lap in under 00:57:00!"],
            reward: {
                name: "Sound Test: CELESTIAL VALLEY",
                image: TEX_CHECK_SOUND_TEST,
            },
        },
        {
            name: ["In any mode other than Free Run,","reach the goal a total of 3 times!"],
            reward: {
                name: "New Machine: WAGON STAR",
                image: get_texture_info("textures/unlocks/unlock-star-wagon.png"),
            },
        },
        {
            name: ["Free Run: FROZEN HILLSIDE","Finish 1 lap in under 00:58:00!"],
            reward: {
                name: "Sound Text: FROZEN HILLSIDE",
                image: TEX_CHECK_SOUND_TEST,
            },
        },
    ],
]


for (let page of checklistData) {
    for (let check of page) {
        check.complete = 0
    }
}

let globalTimer = 0
let checkNum = 0
let prevCheckNum = 0
let checkX = 0
let checkY = 0
let checkInfo = checklistData[0][0]
let checkHoverTrans = 0
const TEX_CONCEPT = get_texture_info("GKYE01_2025-07-30_20-53-24.png")
function hud_render() {
    // Global Site Timer
    globalTimer = globalTimer + 1

    djui_hud_set_resolution(RESOLUTION_N64)
    let screenWidth = djui_hud_get_screen_width()
    let screenHeight = djui_hud_get_screen_height()
    let mouseX = djui_hud_get_mouse_x()
    let mouseY = djui_hud_get_mouse_y()

    djui_hud_set_color(100, 100, 100, 100)
    let gridSpaceX = screenWidth*0.5 - 87
    let gridSpaceY = 27
    let gridSpaceWidth = 188
    let gridSpaceHeight = 142
    djui_hud_render_rect(gridSpaceX, gridSpaceY, gridSpaceWidth, gridSpaceHeight)

    let gridSize = 12
    let gridGap = 2
    let gridX = screenWidth*0.5 - 77
    let gridY = 28
    let gridOutline = 1.5
    for (let w = 0; w < 12; w++) {
        for (let h = 0; h < 10; h++) {
            let currCheck = w+(h*12)
            let x = gridX + w * (gridSize + gridGap)
            let y = gridY + h * (gridSize + gridGap)
            if (checklistData[0][currCheck] != null) {
                if (checklistData[0][currCheck].reward != null) {
                    djui_hud_set_color(219, 81, 46, 255)
                } else {
                    djui_hud_set_color(110, 219, 46, 255)
                }
                if (mouseX >= x && mouseX <= x + gridSize && mouseY >= y && mouseY <= y + gridSize) {
                    checkNum = currCheck
                    checkInfo = checklistData[0][currCheck]
                    checkX = x
                    checkY = y
                }

                if (checkX == 0 || checkY == 0 || currCheck == checkNum) {
                    checkX = x
                    checkY = y
                }
            } else {
                djui_hud_set_color(0, 0, 100, 255)
            }

            djui_hud_render_rect(x, y, gridSize, gridSize)
        }
    }

    if (prevCheckNum != checkNum) {
        prevCheckNum = checkNum
        checkHoverTrans = 255
    }

    djui_hud_set_color(255, 255, 255, 255)
    djui_hud_render_rect(checkX - gridOutline*0.5, checkY - gridOutline*0.5, gridSize + gridOutline, gridOutline)
    djui_hud_render_rect(checkX - gridOutline*0.5, checkY - gridOutline*0.5, gridOutline, gridSize + gridOutline)
    djui_hud_render_rect(checkX - gridOutline*0.5, checkY + gridSize - gridOutline*0.5, gridSize + gridOutline, gridOutline)
    djui_hud_render_rect(checkX + gridSize - gridOutline*0.5, checkY - gridOutline*0.5, gridOutline, gridSize + gridOutline)

    if (checkHoverTrans > 1) {
        checkHoverTrans = checkHoverTrans*0.8
        djui_hud_set_color(255, 255, 255, checkHoverTrans)
        djui_hud_render_rect(checkX + gridSize*0.5 - gridOutline*0.5, gridSpaceY, gridOutline, checkY - gridSpaceY)
        djui_hud_render_rect(gridSpaceX, checkY + gridSize*0.5 - gridOutline*0.5, checkX - gridSpaceX, gridOutline)
        djui_hud_render_rect(checkX + gridSize*0.5 - gridOutline*0.5, checkY + gridSize, gridOutline, gridSpaceHeight - (checkY - gridSpaceY) - gridSize)
        djui_hud_render_rect(checkX + gridSize, checkY + gridSize*0.5 - gridOutline*0.5, gridSpaceWidth - (checkX - gridSpaceX) - gridSize, gridOutline)
    }

    djui_hud_set_color(255, 255, 255, 255)
    if (checkInfo.name[1] != null) {
        djui_hud_print_text(checkInfo.name[0], screenWidth*0.5 - 80, 182, 0.33, 188)
        djui_hud_print_text(checkInfo.name[1], screenWidth*0.5 - 80, 194, 0.33, 188)
    } else {
        djui_hud_print_text(checkInfo.name[0], screenWidth*0.5 - 80, 188, 0.33, 188)
    }

    // Render Unlock Protrait
    if (checkInfo.reward != null) {
        const TEX_CHECK = checkInfo.reward.image != null ? checkInfo.reward.image : TEX_CHECK_DEFAULT
        djui_hud_set_color(153, 153, 153, 255)
        djui_hud_render_rect(screenWidth*0.5 + 110, 160, 50, 35)
        djui_hud_render_texture(TEX_CHECK, screenWidth*0.5 + 112, 162, 31/TEX_CHECK.width, 31/TEX_CHECK.height)
    }

    djui_hud_set_color(255, 255, 255, 100)
    //djui_hud_render_texture(TEX_CONCEPT, screenWidth*0.5 - TEX_CONCEPT.width*screenHeight/TEX_CONCEPT.height*0.5, 0, screenHeight/TEX_CONCEPT.height, screenHeight/TEX_CONCEPT.height)

    djui_hud_set_color(0, 0, 0, 255)
    djui_hud_render_rect(0, 0, screenWidth*0.5 - 150, screenHeight)
    djui_hud_render_rect(screenWidth*0.5 + 150, 0, screenWidth*0.5 - 150, screenHeight)
}

hook_event(hud_render)