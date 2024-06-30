import { Scene, Sound } from 'phaser'

export class SoundManager {
    private backgroundMusic: Phaser.Sound.WebAudioSound
    private explosionSound: Phaser.Sound.WebAudioSound
    private yaySound: Phaser.Sound.WebAudioSound
    private confettiSound: Phaser.Sound.WebAudioSound
    private discoverySound: Phaser.Sound.WebAudioSound
    private swooshSound: Phaser.Sound.WebAudioSound
    private landingSound: Phaser.Sound.WebAudioSound
    private scene: Scene
    private static instance: SoundManager
    private constructor() {}
    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager()
        }
        return SoundManager.instance
    }
    public init(scene: Scene) {
        this.scene = scene
        this.backgroundMusic = scene.sound.add('background_music') as Phaser.Sound.WebAudioSound
        this.explosionSound = scene.sound.add('explosion_sound') as Phaser.Sound.WebAudioSound
        this.yaySound = scene.sound.add('yay_sound') as Phaser.Sound.WebAudioSound
        this.confettiSound = scene.sound.add('confetti_sound') as Phaser.Sound.WebAudioSound
        this.swooshSound = scene.sound.add('swoosh_sound') as Phaser.Sound.WebAudioSound
        this.discoverySound = scene.sound.add('discovery_sound') as Phaser.Sound.WebAudioSound
        this.landingSound = scene.sound.add('landing_sound') as Phaser.Sound.WebAudioSound
    }
    public playLandingSound() {
        if (!this.landingSound.isPlaying) {
            this.landingSound.play('', {
                loop: false,
                volume: 0.5,
                rate: 3.5,
            })
        }
    }
    public playSwooshSound() {
        if (!this.swooshSound.isPlaying) {
            this.swooshSound.play('', {
                loop: false,
                volume: 0.5,
            })
        }
    }
    public playConfettiSound() {
        this.confettiSound.play('', {
            loop: false,
            volume: 0.5,
        })
    }
    public playDiscoverySound() {
        this.discoverySound.play('', {
            loop: false,
            volume: 0.5,
        })
    }
    public playExplosionSound() {
        this.explosionSound.play('', {
            loop: false,
            volume: 0.5,
            seek: 0,
        })
    }
    public playYaySound() {
        this.yaySound.play('', {
            loop: false,
            volume: 0.4,
            seek: 1,
        })
    }
    public playBackgroundMusic() {
        this.backgroundMusic.play('', {
            loop: true,
            volume: 0.1,
        })
    }
}
