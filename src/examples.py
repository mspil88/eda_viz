from dataclasses import dataclass
import pandas as pd

@dataclass
class Example:
    _type: str
    data: pd.DataFrame or pd.Series


def get_example(df, example_type, **kwargs):
    if isinstance(df, pd.DataFrame):
        if example_type == "head":
            try:
                return Example("head", df.head(**kwargs).fillna("nan").astype(float).to_dict())
            except ValueError:
                return Example("head", df.head(**kwargs).fillna("nan").to_dict())
        elif example_type == "tail":
            try:
                return Example("tail", df.tail(**kwargs).fillna("nan").astype(float).to_dict())
            except ValueError:
                return Example("tail", df.tail(**kwargs).fillna("nan").to_dict())
        elif example_type == "sample":
            try:
                return Example("sample", df[~df.isna()].sample(**kwargs).astype(float).to_dict())
            except ValueError:
                return Example("sample", df[~df.isna()].sample(**kwargs).to_dict())
    elif isinstance(df, pd.Series):
        try:
            return Example("sample", list(df[~df.isna()].astype(float).sample(**kwargs)))
        except ValueError:
            return Example("sample", list(df[~df.isna()].sample(**kwargs)))


