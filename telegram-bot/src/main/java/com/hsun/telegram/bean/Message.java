package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Message implements Serializable {
    private final static long serialVersionUID = 0L;

    private Integer messageId;
    private User from;
    private Integer date;
    private Chat chat;
    private User forwardFrom;
    private Chat forwardFromChat;
    private Integer forwardFromMessageId;
    private String forwardSignature;
    private String forwardSenderName;
    private Integer forwardDate;
    private Message replyToMessage;
    private User viaBot;
    private Integer editDate;
    private String mediaGroupId;
    private String authorSignature;
    private String text;
    private MessageEntity[] entities;
    private MessageEntity[] captionEntities;
    private Audio audio;
    private Document document;
    private Animation animation;
    private Game game;
    private PhotoSize[] photo;
    private Sticker sticker;
    private Video video;
    private Voice voice;
    private VideoNote videoNote;
    private String caption;
    private Contact contact;
    private Location location;
    private Venue venue;
    private Poll poll;
    private Dice dice;
    private User[] newChatMembers;
    private User leftChatMember;
    private String newChatTitle;
    private PhotoSize[] newChatPhoto;
    private Boolean deleteChatPhoto;
    private Boolean groupChatCreated;
    private Boolean supergroupChatCreated;
    private Boolean channelChatCreated;
    private Long migrateToChatId;
    private Long migrateFromChatId;
    private Message pinnedMessage;
    private Invoice invoice;
    private SuccessfulPayment successfulPayment;
    private String connectedWebsite;
    private PassportData passportData;
    private InlineKeyboardMarkup replyMarkup;
}
