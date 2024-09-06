import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

console.clear();

/**
 * GET NOTES
 *
 * @param req
 * @param res
 * @param next
 */
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

/**
 * GET NOTE
 *
 * @param req
 * @param res
 * @param next
 */
export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    console.log(mongoose.isValidObjectId(noteId));
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "A note with the given ID was not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

type CreateNoteBody = {
  title?: string;
  text?: string;
};

/**
 * CREATENOTE
 *
 * @param req
 * @param res
 * @param next
 */
export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

type UpdateNoteParams = {
  noteId: string;
};

type UpdateNoteBody = {
  title: string;
  text?: string;
};

/**
 * UPDATENOTE
 * - combines CreateNote && getNode endpoints
 * @param req
 * @param res
 * @param next
 *
 * unknown1 = responseBody (not using this yet)
 * unknown2 = urlQuery (not using this yet)
 */
export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (
  req,
  res,
  next
) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note ID");
    }

    if (!newTitle) {
      throw createHttpError(400, "Title is missing");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE NOTE
 *
 * @param req
 * @param res
 * @param next
 */
export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note ID");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    // await note.remove();
    await NoteModel.findByIdAndDelete(noteId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
